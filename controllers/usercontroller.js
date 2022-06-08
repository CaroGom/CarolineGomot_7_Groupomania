const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ObjectID = require('mongoose').Types.ObjectId;
const User = require('../models/usermodel');


exports.getAllUsers = async (req, res) => {
    const users = await User.find().select('-password');
    res.status(200).json(users);
}

exports.userInfo = (req, res) => {
    console.log(req.params);
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)

    User.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('ID unknown : ' + err);
    })
    .select('-password')
}

//setting up signup function
//salted 10 times to create a user object with the email in the req body and a hashed password
exports.signup = async(req, res) => {
    console.log(req.body);
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash,
        })
        user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }))

};


//setting up login function, bcrypt compares registered hash with req body password hashed
//assigning a token to the user upon successful connection for 24h
exports.login = (req, res, next) => {
    User.findOne({email : req.body.email})
        .then(user => {
            if(!user){
                return res.status(401).json({message: 'Utilisateur non trouvé :(' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid =>{
                    if(!valid){
                        return res.status(401).json({message: 'Mot de passe incorrect :(' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h'}
                        ),
                     });
                })
                .catch(error => res.status(500).json({ error }))
            })
        
        .catch(error => res.status(500).json({ error }))

};


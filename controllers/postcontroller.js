const Post = require('../models/postmodel');
require('dotenv').config({ path: './config/.env' });
const User = require('../models/usermodel');
const { uploadErrors } = require('../utils/errors.utils');
const ObjectID = require('mongoose').Types.ObjectId;
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);

exports.readPost = (req, res) => {
    Post.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log('Failed to get data : ' + err)
    }).sort({ createdAt: -1 });
};

exports.createPost = async (req, res) => {

    console.log(req.body.posterId)
    console.log(req.body)
    console.log(req.file)
    console.log('erreur img')


    const newPost = new Post({

        image: req.file !== undefined ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : "",
        posterEmail: req.body.posterEmail,
        posterId: req.body.posterId,
        message: req.body.message,
        likers: [],

    })
    newPost.save()
    
        .then(() => res.status(201).json({ message: 'Post enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.updatePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)
    const updatedRecord = {
        image: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : "",
        message: req.body.data.message
    }
    console.log('updatesrecord', req.file)
    //`http://localhost:${process.env.PORT_FRONT}/uploads/profil/` + req.file.filename
    Post.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRecord },
        { new: true },
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Update error : " + err);
        }
    )
   // console.log('réponse', res)
};


exports.deletePost = (req, res) => {
    // console.log(req.params.id)
    Post.findOne({ _id: req.params.id, userId: req.token.userId })

        .then(post => {
            if (post.posterId === req.token.userId || req.token.admin === true) {
                
                const filename = post.image.split('/images/')[1];
                fs.unlink(`images/${filename}`, () =>
                    post.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Post supprimé !' }))
                        .catch(error => res.status(400).json({ error, message: error.message }))
                );
            } else {
                console.log('test', req.token.admin)
                res.status(401).json({ message: 'Vous n\'êtes pas autorisé à supprimer ce post !' });
            }
        })
        .catch(error => res.status(500).json({ error, message: error.message }));
};



exports.likePost = async (req, res, next) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json('ID Unknown : ' + req.params.id);
    } else {
        try {
            await Post.findByIdAndUpdate(
                req.params.id,
                {
                    $addToSet: { likers: req.body.id }
                },
                { new : true },
            );
            await Post.findByIdAndUpdate(
                req.body.id,
                {
                    $addToSet: { likes: req.params.id}
                },
                { new : true },
            )
           
            return res.status(200).send('like');
        }
        catch (error) {
            console.log(error)
            return res.status(400).send(error);
        }
    }
}




exports.unlikePost = async (req, res, next) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json('ID Unknown : ' + req.params.id);
    } else {
        try {
            await Post.findByIdAndUpdate(
                req.params.id,
                {
                    $pull: { likers: req.body.id }
                },
                { new : true },
            );
            await Post.findByIdAndUpdate(
                req.body.id,
                {
                    $pull: { likes: req.params.id}
                },
                { new : true },
            )
            return res.status(200).send('dislike');
        }
        catch (error) {
            return res.status(400).send(error);
        }
    }
}

/*
exports.commentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
    try {
        return Post.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterEmail: req.body.commenterEmail,
                        text: req.body.text,
                        timestamp: new Date().getTime()
                    }
                }
            },
            { new: true },
            
        )
        .then((docs) => res.send(docs))
        .catch((err) => res.status(400).send({ message : err }));
    } catch (err){
        return res.status(400).json({message : err});
    }
};
exports.editCommentPost = (req, res , next) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json('ID Unknown : ' + req.params.id);
    } else {
        const id = req.params.id
        return Post.findById(id,
          
            (error, docs) => {
                const commentId = req.body.commentId
                const theComment = docs.comments.find((comment) => {
                    comment._id.equals(commentId)
                })
                if(!theComment) {
                    return res.status(404).send('Comment not found')
                } else {
                    const commentText = req.body.text;
                    theComment.text = commentText;
                }
                return docs.save((error) => {
                    if(!error) {
                        res.status(2000).docs;
                    } else {
                        return res.status(500).send(error);
                    }
                })
            }
        )
       /* try {
            return Post.findById(
                req.paramas.id,
                (error, docs) => {
                    const theComment = docs.comments.find((comment) => {
                        comment._id.equals(req.body.commentId)
                    })
                    if(!theComment) {
                        return res.status(404).send('Comment not found')
                    } else {
                        theComment.text = req.body.text;
                    }
                    return docs.save((error) => {
                        if(!error) {
                            res.status(2000).docs;
                        } else {
                            return res.status(500).send(error);
                        }
                    })
                }
            )
        }
        catch (error) {
            console.log(error)
            return res.status(400).send('Coucou');
            }
    }
}

exports.deleteCommentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    try{
        return Post.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    comments: {
                        _id: req.body.commentId,
                    }
                }
            },
            { new: true }
        )
        .then((docs) => res.send(docs))
        .catch((err) => res.status(400).send({ message : err }));
    } catch (err){
        return res.status(400).json({message : err});
    }
   
}

*/
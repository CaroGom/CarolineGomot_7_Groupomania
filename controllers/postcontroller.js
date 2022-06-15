const Post = require('../models/postmodel');
const bodyparser = require('body-parser');
const User = require('../models/usermodel');
const ObjectID = require('mongoose').Types.ObjectId;

exports.readPost = (req, res) => {
    Post.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log('Failed to get data : ' + err)
    })
};

exports.createPost = async (req, res) => {
    const newPost = new Post(
        {
            posterId: req.body.posterId,
            message: req.body.message,
            likers: [],
            comments: [],
        });

    try {
        const post = await newPost.save();
        return res.status(201).json(post);

    } catch (err) {
        return res.status(400).send(err);
    }
};

exports.updatePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)
    const updatedRecord = {
        message: req.body.message
    }
    Post.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRecord },
        { new: true },
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Update error : " + err);
        }
    )
};

exports.deletePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)
    Post.findByIdAndDelete(
        req.params.id,
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Deletion error : " + err);
        }
    )
};

exports.likePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
    try {
        await Post.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likers: req.body.id }
            },
            { new: true },
            /*(err, docs) => {
                if (err) return res.status(400).send(err);
            }*/
        );
        await User.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { likes: req.params.id }
            },
            { new: true },
            /*(err, docs) => {
                if (!err) res.send(docs);
                else return res.status(400).send(err);
            }*/
        )
        .then((docs) => res.send(docs))
        .catch((err) => res.status(500).send({ message : err }));
    } catch (err) {
        return res.status(500).json({message : err});
    }
};

exports.unlikePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)
};

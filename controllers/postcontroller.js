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
        image: req.file !== undefined ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : "",
        message: req.body.message
    }
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
};


exports.deletePost = (req, res) => {
    console.log(req.params.id)
    Post.findOne({ _id: req.params.id, userId: req.token.userId })

        .then(post => {
            if (post.posterId === req.token.userId || post.admin === req.token.admin) {
                console.log(post.posterId)
                const filename = post.image.split('/images/')[1];
                fs.unlink(`images/${filename}`, () =>
                    Post.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Post supprimé !' }))
                        .catch(error => res.status(400).json({ error, message: error.message }))
                );
            } else {
                res.status(401).json({ message: 'Vous n\'êtes pas autorisé à supprimer ce post !' });
            }
        })
        .catch(error => res.status(500).json({ error, message: error.message }));
};

exports.likePost = (req, res) => {

   
    switch (req.body.likes) {
        case 0:
            Post.findOne({ _id: req.params.id, userId: req.token.userId })
                .then(post => {
                    if (post.likers.includes(req.body.userId)) {
                        Post.updateOne(
                            { _id: req.params.id },
                            {
                                $pull: { likers: req.body.userId },
                            }
                        )
                            .then(() => res.status(200).json({ message: "Post no longer liked !" }))
                            .catch(error => res.status(400).json({ error }))
                        //if sauce was disliked, no longer disliking it
                    }
                }
                )
                .catch(error => res.status(404).json({ error }))
            break;

        //if a user likes a sauce = putting the count to 1
        case 1: Post.findOne({ _id: req.params.id })
            .then(post => {
                //did they already like it
                {
                    Post.updateOne(
                        { _id: req.params.id },
                        {
                            //$inc: {likes: 1},
                            $push: { likers: req.body.userId },
                        }
                    )
                        .then(() => res.status(200).json({ message: "post liked !" }))
                        .catch(error => res.status(400).json({ error }))
                }
            })
            .catch(error => res.status(404).json({ error }))
            break;
    }
   
    break;
}




/*
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
            }
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
            }
        )
        .then((docs) => res.send(docs))
        .catch((err) => res.status(500).send({ message : err }));
    } catch (err) {
        return res.status(500).json({message : err});
    }
};

*/

exports.unlikePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
    try {
        await Post.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { likers: req.body.id }
            },
            { new: true },
            /*(err, docs) => {
                if (err) return res.status(400).send(err);
            }*/
        );
        await User.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { likes: req.params.id }
            },
            { new: true },
            /*(err, docs) => {
                if (!err) res.send(docs);
                else return res.status(400).send(err);
            }*/
        )
            .then((docs) => res.send(docs))
            .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};
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
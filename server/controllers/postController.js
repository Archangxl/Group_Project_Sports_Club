const Post = require('../models/post.model');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

module.exports = {

    createPost: (req, res) => {
        let id = jwt.decode(req.cookies.userToken);
        Post.create({message: req.body.postMessage, userPostingId: id.id})
            .then(createdPost => {
                res.status(200).json(createdPost);
            })
            .catch(err => res.status(400).json(err));
    },

    deletePost: (req,res) => {
        Post.deleteOne(req.body)
            .then(result => res.status(200).json("User Deleted"))
            .catch(err => res.status(400).json(err));
    },

    grabAllPostsForFeedPage: (req, res) => {
        Post.find()
            .then(allPosts => res.status(200).json(allPosts))
            .catch(err => res.status(400).json(err));
    },

    grabAllPostsForOneUserForProfilePage: (req,res) => {
        Post.find()
            .then(allPosts => {
                const id = jwt.decode(req.cookies.userToken);
                let postsPostedByCurrentLoggedInUser = [];
                for(let i = 0; i < allPosts.length; i++) {
                    if (allPosts[i].userPostingId === id) {
                        postsPostedByCurrentLoggedInUser.push(allPosts[i]);
                    }
                }
                res.status(200).json({usersPost: postsPostedByCurrentLoggedInUser})
            })
            .catch(err => res.status(400).json({err: err, message: "grabbing posts error"}))
    }

};
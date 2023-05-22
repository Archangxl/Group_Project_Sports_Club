const Post = require('../models/post.model');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const Like = require('../models/Like.model');

module.exports = {

    createPost: (req, res) => {
        let id = jwt.decode(req.cookies.userToken);
        Post.create({message: req.body.postMessage, userPostingId: id.id, userPostingName: req.body.fullName})
            .then(createdPost => {
                res.status(200).json(createdPost);
            })
            .catch(err => res.status(400).json(err));
    },

    deletePost: (req,res) => {
        Post.deleteOne({_id: req.params.postId})
            .then(result => res.status(200).json("User Deleted"))
            .catch(err => res.status(400).json(err));
    },

    grabAllPostsForFeedPage: (req, res) => {
        const id = jwt.decode(req.cookies.userToken);
        Post.find().sort({createdAt: "desc"})
            .then(allPosts => {
                Like.find()
                    .then(allLikes => {

                        let arrayDictionaryBeingSentToFrontEnd = [];
                        
                        for(let i = 0; i < allPosts.length; i++) {
                            arrayDictionaryBeingSentToFrontEnd.push({numberOfLikes: 0, post: allPosts[i], userLoggedInIdAlreadyLikedPost: false, likes: undefined });
                            for(let j = 0 ; j < allLikes.length; j++) {
                                if(allLikes[j].postId !== allPosts[i]._id.toString()) {
                                    continue;
                                } else {
                                    if (allLikes[j].userLikingPostId === id.id) {
                                        arrayDictionaryBeingSentToFrontEnd[i].userLoggedInIdAlreadyLikedPost = true;
                                    }   
                                    arrayDictionaryBeingSentToFrontEnd[i].likes = allLikes[j]._id;
                                    arrayDictionaryBeingSentToFrontEnd[i].numberOfLikes++;
                                }
                            }
                        }
                        res.status(200).json(arrayDictionaryBeingSentToFrontEnd);
                    })
                    .catch(err => res.status(400).json(err));
            })
            .catch(err => res.status(400).json(err));
    },

    grabAllPostsForOneUserForProfilePage: (req,res) => {
        Post.find()
            .then(allPosts => {
                const id = jwt.decode(req.cookies.userToken);
                let arrayDictionaryBeingSentToFrontEnd = [];
                    Like.find()
                        .then(allLikes => {                       
                            for(let i = 0; i < allPosts.length; i++) {
                                if (allPosts[i].userPostingId === id.id) {
                                    
                                    arrayDictionaryBeingSentToFrontEnd.push({numberOfLikes: 0, post: allPosts[i] });
                                    
                                    for(let j = 0 ; j < allLikes.length; j++) {
                                        if(allLikes[j].postId !== allPosts[i]._id.toString()) {
                                            continue;
                                        } 
                                        if (allLikes[j].userLikingPostId === id.id) {
                                            arrayDictionaryBeingSentToFrontEnd[arrayDictionaryBeingSentToFrontEnd.length-1].userLoggedInIdAlreadyLikedPost = true;
                                        }   
                                        arrayDictionaryBeingSentToFrontEnd[arrayDictionaryBeingSentToFrontEnd.length-1].likes = allLikes[j]._id;
                                        arrayDictionaryBeingSentToFrontEnd[arrayDictionaryBeingSentToFrontEnd.length-1].numberOfLikes++;
                                        
                                    }
                                }
                            }
                            res.status(200).json(arrayDictionaryBeingSentToFrontEnd);
                        })
                        .catch(err => res.status(400).json({err: err, message: "Like Error"}));
            })
            .catch(err => res.status(400).json({err: err, message: "grabbing posts error"}))
    }

};
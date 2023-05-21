const UserInfo = require("../models/user.model.js");
const jwt = require('jsonwebtoken');
const SECRET = "SportsClub";
const user = require('../models/user.model')

module.exports = {
    
    createUserInfo: (req, res) => {
        UserInfo.create(req.body)
            .then((updates) => res.json(updates))
            .catch((err) => {
                res.status(400).json({err});
            });
    },

    getAllUserInfo: (req, res) => {
        UserInfo.find()
            .then((allUser) => res.json(allUser)) 
            .catch((err) => {
                res.status(400).json({err});
            });
    },

    getOneUserInfo: (req, res) => {
        UserInfo.findOne({_id: req.params.id})
            .then((oneUser) => res.json(oneUser))
            .catch((err) => {
                res.status(400).json({err});
            });
    },

    updateUserInfo: (req, res) => {
        UserInfo.findByIdAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators: true})
            .then((updatedUser) => {
                console.log(updatedUser);
                res.json(updatedUser);
            })
            .catch((err) => {
                res.status(400).json({err});
            });
    },
};
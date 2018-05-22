var mongoose = require('mongoose');
var User = mongoose.model('User');
var Tools = require('../tools/controllerTools');
var UserAttempt = require('../models/userAttempt');
var Topic = require('../models/topic');

exports.getAttempts = function (req, res) {
    var token = Tools.checkToken(req);
    if (!token) {
        var exc = Tools.Error("Token not found", 401);
        return res.json(exc);
    }
    User.findOne({ api_token: token }).exec((err, user) => {
        if (!user) {
            var exc = Tools.Error("User not found", 401);
            return res.json(exc);
        }
        UserAttempt.find({ user_id: user.id }).exec((err_attempt, attempts) => {
            Topic.find().exec(function (t_err, tops) {
                var result = attempts.map((v, i, arr) => {
                    var topics_res = v.topics.map((v, i, arr) => {
                        return {
                            id: v.id,
                            title: Tools.findByProperty(tops, v.id, "id").title,
                            correctly: v.correctly
                        };
                    });
                    var score = 0;
                    topics_res.forEach(element => {
                        score += element.correctly;
                    });
                    return {
                        id: v.id,
                        start_date: v.start_date,
                        end_date: v.end_date,
                        topics: topics_res,
                        total_score: score
                    };
                });
                return res.json(result);
            });
        });
    });
};
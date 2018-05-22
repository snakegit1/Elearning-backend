var tools = require('../tools/controllerTools');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var UserWriting = require('../models/userWriting');
var langToolAPi = require('../tools/langToolApi');
var proofreaderApi = require('../tools/proofreaderApi');

exports.checkText = function (req, res) {
    var token = tools.checkToken(req);
    if (!token) {
        var exception = tools.Error('User is not authorized', 401)
        return res.json(exception);
    }
    User.findOne({ id: req.body.user_id }).exec((err, user) => {
            if (user) {
                var index = user.writings.length + 1;
                langToolAPi.checkText(req.body.text, (err, body) => {
                    var data = {
                        time: req.body.time,
                        id: index,
                        _id: new mongoose.Types.ObjectId(),
                        langTool: JSON.stringify(body),
                        text: req.body.text,
                        count_words: req.body.count_words
                    };
                    UserWriting.create(data, (err, result) => {
                        if (err) {
                            var exception = tools.Error('create result exception', 401);
                            return res.json(exception);
                        } else {
                            user.writings.push(result._id);
                            user.save((error) => {
                                if (!error) {
                                    return res.json({ attempt_id: index });
                                } else {
                                    var exception = tools.Error('update user exception', 401);
                                    return res.json(exception);
                                }
                            });

                        }
                    });
                });
            } else {
                var exception = tools.Error('User is not found', 401)
                return res.json(exception);
            }
        });
}

exports.getWritingResults = function (req, res) {
    var token = tools.checkToken(req);
    if (!token) {
        var exception = tools.Error('User is not authorized', 401)
        return res.json(exception);
    }
    User.findOne({ id: req.body.user_id })
        .populate('writings').exec((err, user) => {
            if (user) {
                var user_res = {};
                user.writings.forEach(element => {
                    if (element.id == req.body.attempt_id) {
                        user_res = element;
                        return;
                    }
                });
                if (user_res) {
                    return res.json(user_res);
                } else {
                    var exception = tools.Error('Attempt is not found', 401)
                    return res.json(exception);
                }
            } else {
                var exception = tools.Error('User is not found', 401)
                return res.json(exception);
            }
        });
}

exports.checkFile = function (req, res) {
    proofreaderApi.checkFile(req.body.text, (data) => {
        res.json({ text: data });
    });
}
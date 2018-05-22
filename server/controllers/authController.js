var mongoose = require('mongoose');
var User = require('../models/user');
var crypto = require('crypto');
var bcrypt = require('bcrypt');
var Tools = require('../tools/controllerTools');

exports.verify = function (req, res) {
    var token = Tools.checkToken(req);
    User.findOne({ api_token: token }).exec(function (err, user) {
        if (user) {
            return res.end('true');
        } else {
            return res.end('false');
        }
    });
};

exports.signup = function (req, res, next) {
    if (req.body.full_name &&
        req.body.email &&
        req.body.password &&
        req.body.signup_method) {

        bcrypt.hash(req.body.password, 10, function (err, hash) {
            if (err) {
                return next(err);
            }

            var userData = {
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                full_name: req.body.full_name,
                password: hash,
                signup_method: req.body.signup_method,
            };

            User.create(userData, function (err, user) {
                if (err) {
                    var error = {
                        message: 'The email has already been taken.',
                        status_code: 422
                    };
                    return res.json(error);
                } else {
                    return res.end('true');
                }
            });
        });
    };
};

exports.login = function (req, res, next) {
    if (req.body.email && req.body.password) {
        User.authenticate(req.body.email, req.body.password, function (err, user) {
            if (err || !user) {
                return res.json(err);
            } else {
                var token = crypto.randomBytes(100).toString('hex');
                user.api_token = token;
                user.save(function (error) {
                    if (error) {
                        var error = {
                            message: 'Wrong credentials.',
                            status_code: 401
                        };
                        return res.json(error);
                    }
                    return res.json(
                        {
                            token: token,
                            user: {
                                id: user.id,
                                full_name: user.full_name,
                                email: user.email
                            }
                        }
                    );
                });

            }
        });
    }
};

exports.logout = function (req, res, next) {
    var token = req.headers["authorization"];
    if (token === null || token === undefined){
        var error = {
            message: "Token is null",
            status_code: 401
        };
        res.json(error);
    }
    token = token.substring("Bearer ".length);
    User.findOne({ api_token: token }).exec(function (err, user) {
        if (user) {
            user.api_token = null;
            user.save(function (error) {
                if (error) next(error);
            });
            return res.end('true');
        } else
            return res.end('false');
    });

};

exports.signup_methods = function (req, res) {
    res.send('NOT IMPLEMENTED: Author list');
};

exports.signup_method_title = function (req, res) {
    res.send('NOT IMPLEMENTED: Author list');
};

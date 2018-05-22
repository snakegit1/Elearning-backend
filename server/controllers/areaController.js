var Area = require('../models/area');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Tools = require('../tools/controllerTools');

exports.getUserAreas = function (req, res) {
    var token = Tools.checkToken(req);
    User.findOne({ api_token: token }).exec(function (err, user) {
        if (user) {
            Area.find({}, (areaErr, areasDB) => {
                var areas = [];
                areasDB.forEach(element => {
                    var isUserHave = false;
                    if (user.areas.includes(element.id)) {
                        isUserHave = true;
                    }
                    var area = {
                        id: element.id,
                        title: element.title,
                        isUserHaveAccess: isUserHave
                    };
                    areas.push(area);
                });
                return res.json(areas);
            });
        } else {
            var error = {
                message: 'User not found.',
                status_code: 401
            };
            return res.json(error);
        }
    });
};

exports.getAreaTitle = function (req, res) {

    Area.findOne({ title: req.params.areaTitle }).exec(function (err, area) {
        if (area) {
            return res.json({ id: area.id, title: area.title });
        } else {
            var error = {
                message: 'Area not found',
                status_code: 401
            };
            return res.json(error);
        }
    });
};
var CompromiseDOC = require('../tools/compromiseAPI');
var tools = require('../tools/controllerTools');
var exception = tools.Error('Values not found', 422);

exports.getPeople = function (req, res) {
    var doc = new CompromiseDOC(req.body.text);
    doc.getPeople() ? res.json(doc.getPeople().data()) : res.json(exception);
}

exports.getPlaces = function (req, res) {
    var doc = new CompromiseDOC(req.body.text);
    doc.getPlaces() ? res.json(doc.getPlaces().data()) : res.json(exception);
}

exports.getNouns = function (req, res) {
    var doc = new CompromiseDOC(req.body.text);
    doc.getNouns() ? res.json(doc.getNouns().data()) : res.json(exception);
}

exports.getVerbs = function (req, res) {
    var doc = new CompromiseDOC(req.body.text);
    doc.getVerbs() ? res.json(doc.getVerbs().data()) :
    res.json(exception);
}

exports.getValues = function (req, res) {
    var doc = new CompromiseDOC(req.body.text);
    doc.getValues() ? res.json(doc.getValues().data()) :
    res.json(exception);
}

exports.getAdjectives = function (req, res) {
    var doc = new CompromiseDOC(req.body.text);
    doc.getAdjectives() ? res.json(doc.getAdjectives().data()) : 
    res.json(exception);
}

exports.getDates = function (req, res) {
    var doc = new CompromiseDOC(req.body.text);
    doc.getDates() ? res.json(doc.getDates().data()) :
    res.json(exception);
}

exports.getHashtags = function (req, res) {
    var doc = new CompromiseDOC(req.body.text);
    doc.getHashtags() ? res.json(doc.getHashtags().data()) :
    res.json(exception);
}

exports.getPhoneNumbers = function (req, res) {
    var doc = new CompromiseDOC(req.body.text);
    doc.getPhoneNumbers() ? res.json(doc.getPhoneNumbers().data()) :
    res.json(exception);
}

exports.getLists = function (req, res) {
    var doc = new CompromiseDOC(req.body.text);
    doc.getLists() ? res.json(doc.getLists().data()) :
    res.json(exception);
}

exports.getClauses = function (req, res) {
    var doc = new CompromiseDOC(req.body.text);
    doc.getClauses() ? res.json(doc.getClauses().data()) :
    res.json(exception);
}

exports.getQuestions = function (req, res) {
    var doc = new CompromiseDOC(req.body.text);
    doc.getQuestions() ? res.json(doc.getQuestions().data()) :
    res.json(exception);
}
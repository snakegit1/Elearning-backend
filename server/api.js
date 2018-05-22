const express = require('express');
const router = express.Router();

//Auth location
var auth = require('./controllers/authController');
router.get('/auth/verify', auth.verify);
router.get('/auth/signup-methods', auth.signup_methods);
router.get('/auth/signup-method/:title', auth.signup_method_title);
router.get('/auth/logout', auth.logout);
router.post('/auth/login', auth.login);
router.post('/auth/signup', auth.signup);

//Area location
var area = require('./controllers/areaController');
router.get('/areas/user', area.getUserAreas);
router.get('/areas/get/:areaTitle', area.getAreaTitle);

//User-results location
var userResults = require('./controllers/userResultsController');
router.get('/user-results/:attemptId', userResults.getResults);
router.post('/user-results', userResults.create);

//Stats location
var stats = require('./controllers/statsController');
router.get('/stats/attempts', stats.getAttempts);

var questions = require('./controllers/questionController');
router.get('/questions', questions.get);

var writings = require('./controllers/writingController');
var writingCompromise = require('./controllers/writingCompromiseController');
router.post('/writing/compromise/getPeople', writingCompromise.getPeople);
router.post('/writing/compromise/getPlaces', writingCompromise.getPlaces);
router.post('/writing/compromise/getNouns', writingCompromise.getNouns);
router.post('/writing/compromise/getVerbs', writingCompromise.getVerbs);
router.post('/writing/compromise/getValues', writingCompromise.getValues);
router.post('/writing/compromise/getAdjectives', writingCompromise.getAdjectives);
router.post('/writing/compromise/getDates', writingCompromise.getDates);
router.post('/writing/compromise/getHashtags', writingCompromise.getHashtags);
router.post('/writing/compromise/getPhoneNumbers', writingCompromise.getPhoneNumbers);
router.post('/writing/compromise/getLists', writingCompromise.getLists);
router.post('/writing/compromise/getClauses', writingCompromise.getClauses);
router.post('/writing/compromise/getQuestions', writingCompromise.getQuestions);

router.post('/writing/check-text', writings.checkText);
router.post('/writing/check-file', writings.checkFile);
router.post('/writing/writing-result', writings.getWritingResults);

module.exports = router;
var Area = require('../models/area');
var Tools = require('../tools/controllerTools');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Question = require('../models/question');
var UserAttempt = require('../models/userAttempt');
var Topic = require('../models/topic');

exports.getResults = function (req, res) {
    var token = Tools.checkToken(req);
    var attemptId = req.params.attemptId;
    if (!attemptId || !token) {
        var exc = Tools.Error("Results not found", 422);
        return res.json(exc);
    }
    UserAttempt.findOne({ id: attemptId })
        .populate('areaId')
        .populate('userId')
        .populate(
        {
            path: 'questions.question',
            populate: { path: 'answerIds' }
        })
        .populate(
        {
            path: 'questions.question',
            populate: { path: 'topicId' }
        })
        .exec(function (err, userAttempt) {
            if (err) {
                var exc = Tools.Error("Invalid id");
                return res.json(exc);
            }
            var questions = [];
            var score = 0;
            userAttempt.topics.forEach(topic => {
                score += topic.correctly;
            });
            userAttempt.questions.forEach(attempt_question => {
                var answers = [];
                attempt_question.question.answerIds.forEach(answer => {
                    answers.push({
                        id: answer.id,
                        text: answer.text,
                        type: answer.type,
                        description: answer.description,
                        is_correct: answer.is_correct ? 1 : 0,
                        question_id: attempt_question.question.id,
                        is_user_answer: answer === attempt_question.user_answer
                    });
                });
                var correct = was_answered_correctly(attempt_question.question.answerIds, attempt_question.user_answer);
                questions.push({
                    id: attempt_question.question.id,
                    text: attempt_question.question.text,
                    description: attempt_question.question.description,
                    description_type: attempt_question.question.description_type,
                    explanation: attempt_question.question.explanation,
                    categories: [{
                        id: attempt_question.question.topicId.id,
                        title: attempt_question.question.topicId.title
                    }],
                    was_answered_correctly: correct,
                    answers: answers
                });
            });
            var diff = userAttempt.end_date - userAttempt.start_date;
            var date = new Date(0, 0, 0, 0, 0, 0, diff);
            var result = {
                score: score,
                questions: questions,
                completion_time: toDateString(date),
                area_title: userAttempt.areaId.title
            };
            res.json(result);
        });
};

exports.create = function (req, res) {
    Area.findOne({ title: req.body.area_title }).exec((err, area) => {
        if (area) {
            var s_date = new Date(req.body.start_date);
            var e_date = new Date(req.body.end_date);
            var token = Tools.checkToken(req);
            if (!token) {
                var exc = Tools.Error("Token not found", 401);
                return res.json(exc);
            }
            User.findOne({ api_token: token }).exec((error, us) => {
                if (us) {
                    var attempt = {
                        _id: new mongoose.Types.ObjectId(),
                        user_id: us.id,
                        area_id: area.id,
                        start_date: s_date,
                        end_date: e_date,
                        areaId: area._id,
                        userId: us._id,
                        questions: []
                    };
                    var questions = req.body.answers.map((val, index, arr) => {
                        return val.question_id;
                    });
                    Question.find({ 'id': { $in: questions } })
                        .populate('answerIds')
                        .populate('topicId')
                        .exec((err, qIds) => {
                            req.body.answers.forEach(element => {
                                attempt.questions.push(
                                    {
                                        question: { _id: get_id(element.question_id, qIds) },
                                        user_answer: element.id
                                    });
                            });
                            var topics = [];
                            attempt.questions.forEach(q => {
                                var question = qIds.find((v, i, arr) => {
                                    return v._id === q.question._id;
                                });
                                var topic = Tools.findByProperty(topics, question.topic_id, "id");
                                var correct = was_answered_correctly(question.answerIds, q.user_answer);
                                if (topic) {
                                    if (correct) {
                                        topic.correctly++;
                                    }
                                } else {
                                    var topic = {
                                        id: question.topic_id,
                                        correctly: 0
                                    };

                                    if (correct) {
                                        topic.correctly++;
                                    }
                                    topics.push(topic);
                                }

                            });
                            attempt.topics = topics;
                            UserAttempt.create(attempt, function (err, userAttempt) {
                                if (err) {
                                    var exc = Tools.Error("The email has already been taken.", 422);
                                    return res.json(exc);
                                } else {
                                    return res.json({ id: userAttempt.id });
                                }
                            });
                        });

                } else {
                    var exc = Tools.Error("User not found", 401);
                    return res.json(exc);
                }
            });
        } else {
            var exc = {
                message: "Area not found",
                status_code: 401
            };
            res.json(exc);
        }
    });
};

function get_id(user_answer, _qIds) {
    var qId = _qIds.find((v, i, a) => {
        if (v.id === user_answer) {
            return v._id;
        }
    });
    return qId._id;
};



function was_answered_correctly(answers, user_answer) {
    var answer = answers.find((v, i, a) => {
        return v.id === user_answer && v.is_correct;
    });
    return answer ? true : false;
};

function toDateString(date) {
    return `${(date.getHours() < 10 ? '0' : '') + date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}:${date.getSeconds()}`;
}
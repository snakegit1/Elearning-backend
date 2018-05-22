var Question = require('../models/question');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Tools = require('../tools/controllerTools');
var Answer = require('../models/answer');

exports.get = function (req, res) {
    var token = Tools.checkToken(req);
    var n = 15;
    if (token) {
        Question.find()
            .populate('answerIds')
            .populate('topicId')
            .exec(function (err, questions) {
                var r_questions = [];
                getTopics(questions).forEach(topic => {
                    var filter_questions = questions.filter((v, i, arr) => v.topic_id === topic);
                    if (filter_questions.length <= n) {
                        r_questions = r_questions.concat(filter_questions);
                    } else {
                        var arr = []
                        while (arr.length < n) {
                            var randomnumber = Math.floor(Math.random() * filter_questions.length);
                            if (arr.indexOf(randomnumber) > -1) continue;
                            arr[arr.length] = randomnumber;
                        }
                        arr.forEach(i => {
                            r_questions.push(filter_questions[i]);
                        })
                    }
                })
                var result = [];
                r_questions.forEach(element => {
                    var answers = [];
                    element.answerIds.forEach(answer => {
                        answers.push(
                            {
                                id: answer.id,
                                text: answer.text,
                                type: answer.type,
                                question_id: element.id
                            }
                        );
                    });
                    var q = {
                        id: element.id,
                        text: element.text,
                        description: element.description,
                        explanation: element.explanation,
                        was_answered: element.was_answered,
                        description_type: element.description_type,
                        answers: answers
                    };
                    result.push(q);
                });
                res.json(result);
            });
    } else {
        var exc = Tools.Error("User not authorized", 422);
        res.json(exc);
    }
};

function getTopics(questions) {
    return questions.map((v, i, arr) => {
        return v.topic_id;
    }).filter((v, i, a) => a.indexOf(v) === i);
}
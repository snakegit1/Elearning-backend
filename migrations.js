var User = require('./server/models/user');
var Area = require('./server/models/area');
var Question = require('./server/models/question');
var Answer = require('./server/models/answer');
var Topic = require('./server/models/topic');

var fs = require('fs');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var path = require('path');
var config = require('./server/configs/servConfig');

//API file for interacting with MongoDB
//connect to MongoDB
mongoose.connect(config.dbUrl);
var db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected!")
});

var userBuffer = fs.readFileSync('./server/migrations/user.json', 'UTF-8');
var answersBuffer = fs.readFileSync('./server/migrations/answer.json', 'UTF-8');
var areaBuffer = fs.readFileSync('./server/migrations/area.json', 'UTF-8');
var questionsBuffer = fs.readFileSync('./server/migrations/questions.json', 'UTF-8');
var topicsBuffer = fs.readFileSync('./server/migrations/topics.json', 'UTF-8')

db.dropCollection('users', function (err, result) {
    if (err) console.log(err.message);
    console.log("users drop");
});

db.dropCollection('areas', function (err, result) {
    if (err) console.log(err.message);
    console.log("areas drop");
});

db.dropCollection('answers', function (err, result) {
    if (err) console.log(err.message);
    console.log("answers drop");
});

db.dropCollection('questions', function (err, result) {
    if (err) console.log(err.message);
    console.log("questions drop");
});

db.dropCollection('userattempts', function (err, result) {
    if (err) console.log(err.message);
    console.log("userattempts drop");
});

db.dropCollection('topics', function (err, result) {
    if (err) console.log(err.message);
    console.log("topics drop");
});

var user = JSON.parse(userBuffer);
user._id = new mongoose.Types.ObjectId();

var topics = JSON.parse(topicsBuffer);
topics.forEach(element => {
    element._id = new mongoose.Types.ObjectId();
});


var answers = JSON.parse(answersBuffer);
answers.forEach(element => {
    element._id = new mongoose.Types.ObjectId();
});

var questions = JSON.parse(questionsBuffer);
questions.forEach(element => {
    element._id = new mongoose.Types.ObjectId();
    element.answers.forEach(elem => {
        var answer = answers.find((value, index, arr) => {
            return value.id === elem;
        });
        element.answerIds.push(answer._id);
    });
    var topic = topics.find((value, index, arr) => {
        return value.id === element.topic_id;
    });
    element.topicId = topic._id;
});

var areas = JSON.parse(areaBuffer);
areas.forEach(element => {
    element._id = new mongoose.Types.ObjectId();
    if (element.topics.length > 0) {
        element.topics.forEach(id => {
            var topic = topics.find((value, index, arr) => {
                return value.id === id;
            });
            if (topic.questions.length > 0) {
                topic.questions.forEach(id => {
                    var question = questions.find((value, index, arr) => {
                        return value.id === id;
                    });
                    topic.questionIds.push(question._id);
                });
            }
            element.topicIds.push(topic._id);
        });
    }
});

var count = 0;
Topic.insertMany(topics, (err, topics) => {
    if (err) console.log(err);
    console.log("topics inserts");
    Area.insertMany(areas, (err, areas) => {
        if (err) console.log(err.message);
        console.log("areas inserts");
        Area.find({ 'id': { $in: user.areas } }).select('_id').exec(function (er, f_areas) {
            bcrypt.hash(user.password, 10, function (err, hash) {
                user.password = hash;
                user.areasIds = f_areas;
                User.create(user, (err, users) => {
                    if (err) console.log(err.message);
                    console.log("users inserts");
                    count++;
                    exit(count);
                });
            });
        });
    });
});

Answer.insertMany(answers, (err, answers) => {
    if (err) console.log(err.message);
    console.log("answers inserts");
    Question.insertMany(questions, (err, questions) => {
        if (err) console.log(err.message);
        console.log("questions inserts");
        count++;
        exit(count);
    });
});


function exit(count) {
    if (count === 2) {
        process.exit(0);
    }
}
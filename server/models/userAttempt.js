var autoIncrement = require("mongoose-easy-auto-increment");
var mongoose = require('mongoose');

var userAttemptSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    id: { type: Number },
    user_id: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    area_id: {
        type: Number,
        required: true
    },
    areaId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Area'
    },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    },
    questions: [
        {
            question: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Question'
            },
            user_answer: {
                type: Number
            }
        }
    ],
    topics: [
        {
            id: { type: Number },
            correctly: { type: Number, default: 0 }
        }
    ]
});

userAttemptSchema.plugin(autoIncrement, { field: 'id', collection: 'UserAttemptCounters' });

var UserAttempt = mongoose.model('UserAttempt', userAttemptSchema);

module.exports = UserAttempt;
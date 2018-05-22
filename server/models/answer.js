var autoIncrement = require("mongoose-easy-auto-increment");
var mongoose = require('mongoose');

var answerSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    id: {
        type: Number
    },
    text: {
        type: String,
        required: true
    },
    type: {type: String, default: 'text' },
    description: {
        type: String
    },
    is_correct: {
        type: Boolean
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
});

answerSchema.plugin(autoIncrement, { field: 'id', collection: 'AnswerCounters' });

var Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
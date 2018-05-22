var autoIncrement = require("mongoose-easy-auto-increment");
var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    id: { type: Number },
    text: {
        type: String,
        required: true
    },
    description: {
        type: String        
    },
    description_type: {
        type: String,
        required: true,
        default: "text"
    },
    explanation: {
        type: String        
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    },
    answers: [{
        type: Number
    }],    
    area_id: {
        type: Number,
        required: true
    },
    topic_id: {
        type: Number,
        required: true
    },
    topicId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Topic'
    },
    answerIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
    }],
    was_answered: {
        type: Boolean,
        default: false
    }
});

questionSchema.plugin(autoIncrement, { field: 'id', collection: 'QuestionCounters' });

var Question = mongoose.model('Question', questionSchema);

module.exports = Question;
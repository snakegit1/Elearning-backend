var autoIncrement = require("mongoose-easy-auto-increment");
var mongoose = require('mongoose');

var topicSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    id: { type: Number },
    title: {
        type: String,
        required: true,
        max: 255
    },
    questionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    questions: [{ type: Number }]
});

topicSchema.plugin(autoIncrement, { field: 'id', collection: 'TopicCounters' });

var Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
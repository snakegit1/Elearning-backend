var mongoose = require('mongoose');

var userWritingSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    id: { type: Number },       
    text: { type: String },
    time: { type: Number },
    langTool: { type: String },
    count_words: {type: Number}
});

var UserWriting = mongoose.model('UserWriting', userWritingSchema);

module.exports = UserWriting;
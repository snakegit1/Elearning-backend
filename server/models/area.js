var autoIncrement = require("mongoose-easy-auto-increment");
var mongoose = require('mongoose');

var areaSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    id: { type: Number },
    title: {
        type: String,
        required: true,
        max: 255
    }, 
    topicIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic'
    }],
    topics:[{
        type: Number
    }]
});

areaSchema.plugin(autoIncrement, { field: 'id', collection: 'AreaCounters' });

var Area = mongoose.model('Area', areaSchema);

module.exports = Area;
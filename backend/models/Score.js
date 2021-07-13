const mongoose  = require('mongoose');

const ScoreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
},{
    versionKey: false
});

module.exports = mongoose.model('Score', ScoreSchema);
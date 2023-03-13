const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    Question: {
        type: String,
        required: true,
        unique: true,
    },
    optionA: {
        type: String,
        required: true,
    }
    ,
    optionB: {
        type: String,
        required: true,
    },
    optionC: {
        type: String,
        required: true,
    },
    optionD: {
        type: String,
        required: true,
    },
    tags: [String]
}, {collection: 'QuestionDB'})

const model = mongoose.model('QuestionSchema', QuestionSchema);

module.exports = model;
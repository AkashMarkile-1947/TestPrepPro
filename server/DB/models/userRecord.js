const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    questionNo: {
        type: Number,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    selectedAns: {
        type: String,
        required: true,
    },
    correctAns: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    }
})


const UserRecord = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    dateTime: {
        type: String,
        default:  () => {
            const date = new Date();
            return `${date.toLocaleDateString()}  ${date.toLocaleTimeString()}`;
        },
    },
    rightAns: {
        type: Object,
        required: true
    },
    rightTags: {
        type: [Array],
        required: true,
    },
    wrongTags: {
        type: [Array],
        required: true,
    },
    subjects: {
        type: [Array],
        required: true,
    },
    totalScore: {
        type: Number,
        required: true,
    },
    userScore: {
        type: Number,
        required: true,
    },
    wrongAns: {
        type: Object,
        required: true,
    }
}, {collection: 'userRecord'})

const model = mongoose.model("UserRecord", UserRecord);
module.exports = model;
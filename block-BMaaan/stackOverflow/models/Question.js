const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let QuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    answers: [
    {
        type: Schema.Types.ObjectId,
        ref: "Answer",
    },
    ],
    askedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    viewed: {
        type: Number,
        default: 0,
    },
    tags: {
        type: [String],
    },
    upVote: {
        type: Number,
        default: 0,
    },
    downVote: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model("Question", QuestionSchema);
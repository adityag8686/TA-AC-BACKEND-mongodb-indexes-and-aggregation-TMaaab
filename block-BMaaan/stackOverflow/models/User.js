const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    reputation: {
        type: Number,
    },
    questionAsked: [
    {
        type: Schema.Types.ObjectId,
        ref: "Question",
    },
    ],
    answers: [
    {
        type: Schema.Types.ObjectId,
        ref: "Answer",
    },
    ],
});


module.exports = mongoose.model("User", userSchema);
const mongoose = require('mongoose');

const CompletedQuizSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    Quizzes: [
        {
            lesson_Id: {
                type: String,
                required: true
            },
            score: {
                type: Number,
                required: true
            },
            completedAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

const CompletedQuiz = mongoose.model("CompletedQuiz", CompletedQuizSchema);
module.exports = CompletedQuiz;

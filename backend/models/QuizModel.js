const mongoose = require('mongoose');

const QuizQuestionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: { type: [String], required: true },
    answer: { type: String, required: true }
});

const QuizSchema = new mongoose.Schema({
    lessonName: { type: String, required: true },
    category: { type: String, required: true },
    questions: { type: [QuizQuestionSchema], required: true }
});

const Quiz = mongoose.model('Quiz', QuizSchema);

module.exports = Quiz;

const mongoose = require('mongoose');

const LikedLessonSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    Lessons: [
        {
            lesson_Id: {
                type: String,
                required: true
            }
        }
    ]
});

const LikedLesson = mongoose.model("LikedLesson", LikedLessonSchema);
module.exports = LikedLesson;

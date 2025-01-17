const mongoose = require('mongoose');

const AttemptLaterSchema = new mongoose.Schema({
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

const AttemptLater = mongoose.model("AttemptLater", AttemptLaterSchema);
module.exports = AttemptLater;

const Lesson = require("../models/LessonModel");
const { v4: uuidv4 } = require('uuid');

// Fetch all lessons
// Fetch lessons by category
// Fetch lessons by category (case-insensitive)
exports.getLessons = async (req, res) => {
    try {
        const categoryName = req.params.name.toLowerCase(); // Convert the category name from the request parameters to lowercase
        const lessons = await Lesson.find({ category: { $regex: new RegExp('^' + categoryName + '$', 'i') } }); // Use a case-insensitive regex to match the category
        res.send(lessons);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error fetching lessons' });
    }
};


// Create a new lesson with a UUID
// exports.createLesson = async (req, res) => {
//     try {
//         const { lessonName, image, category } = req.body;
//         const lesson = new Lesson({
//             id: uuidv4(),
//             lessonName,
//             image,
//             category
//         });
//         await lesson.save().then(() => {
//             res.json(lesson);
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: 'Error creating lesson' });
//     }
// }; // Adjust the path to your Lesson model

// Create new lessons with UUIDs
exports.createLesson = async (req, res) => {
    try {
        const lessonsData = req.body; // Expecting an array of lesson objects
        const lessons = lessonsData.map(lesson => ({
            id: uuidv4(),
            lessonName: lesson.lessonName,
            image: lesson.image,
            category: lesson.category
        }));

        const savedLessons = await Lesson.insertMany(lessons);
        res.json(savedLessons);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error creating lessons' });
    }
};


// // Delete a lesson by ID
// exports.deleteLesson = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const result = await Lesson.findOneAndDelete({ id: id });
//         if (result) {
//             res.status(200).json({ message: 'Lesson deleted successfully' });
//         } else {
//             res.status(404).json({ message: 'Lesson not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting lesson', error });
//     }
// };

// // Update a lesson by ID
// exports.updateLesson = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const updated = req.body;
//         const result = await Lesson.findOneAndUpdate({ id: id }, updated, { new: true });
//         if (result) {
//             res.status(200).json({ message: 'Lesson updated successfully', result });
//         } else {
//             res.status(404).json({ message: 'Lesson not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating lesson', error: error.message });
//         console.log(error);
//     }
// };

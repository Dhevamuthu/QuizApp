const Lesson = require('../models/LessonModel'); // Import the Lesson model
const Quiz = require('../models/QuizModel'); 

// POST method to add a single quiz
exports.addQuiz = async (req, res) => {
    try {
        const { lessonName, category, questions } = req.body;

        // Create a new quiz document
        const newQuiz = new Quiz({
            lessonName,
            category,
            questions
        });

        // Save the quiz to the database
        await newQuiz.save();

        res.status(201).json({ message: 'Quiz added successfully', quiz: newQuiz });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// POST method to add multiple quizzes
exports.addMultipleQuizzes = async (req, res) => {
    try {
        const quizzes = req.body; // Expecting an array of quiz objects

        // Use mongoose insertMany to add multiple quizzes at once
        const addedQuizzes = await Quiz.insertMany(quizzes);

        res.status(201).json({ message: 'Quizzes added successfully', quizzes: addedQuizzes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET method to fetch quiz questions by lessonName
// exports.getQuizByLessonName = async (req, res) => {
//     try {
//         const { userId } = req.user;

//         // Check if user is authenticated
//         if (!userId) {
//             return res.status(401).json({ message: "Authentication required" });
//         }

//         const { lessonName } = req.params;

//         // Fetch the quiz with only the questions and options fields
//         const quiz = await Quiz.findOne(
//             { lessonName }, 
//             { "questions.question": 1, "questions.options": 1 }
//         );

//         // If the quiz is not found, return a 404 response
//         if (!quiz) {
//             return res.status(404).json({ message: 'Quiz not found for this lesson name' });
//         }

//         // Return the quiz data
//         res.status(200).json(quiz);
//     } catch (error) {
//         // Handle any server errors
//         res.status(500).json({ error: error.message });
//     }
// };

// GET method to fetch quiz questions by lessonId
exports.getQuizByLessonId = async (req, res) => {
    try {
        const { userId } = req.user;

        // Check if user is authenticated
        if (!userId) {
            return res.status(401).json({ message: "Authentication required" });
        }

        const { lessonId } = req.params;

        // Fetch the lesson by its custom ID
        const lesson = await Lesson.findOne({ id: lessonId });

        // If the lesson is not found, return a 404 response
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found with this ID' });
        }

        // Fetch the quiz associated with the lessonName, including answers
        const quiz = await Quiz.findOne(
            { lessonName: lesson.lessonName }
        );

        // If the quiz is not found, return a 404 response
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found for this lesson ID' });
        }

        // Return the quiz data
        res.status(200).json(quiz);
    } catch (error) {
        // Handle any server errors
        res.status(500).json({ error: error.message });
    }
};



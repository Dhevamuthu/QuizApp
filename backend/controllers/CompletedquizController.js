const CompletedQuiz = require("../models/CompletedquizModel");
const Lesson = require("../models/LessonModel");

// Add a quiz to the CompletedQuiz collection
exports.addCompletedQuiz = async (req, res) => {
    const { userId } = req.user;
    const { lessonId, score } = req.body;

    try {
        let completedQuizList = await CompletedQuiz.findOne({ userId });

       // If the user doesn't have a CompletedQuiz list, create a new one
        if (!completedQuizList) {
            const newCompletedQuiz = new CompletedQuiz({
                 userId,
                Quizzes: [
                    {
                        lesson_Id: lessonId,
                        score
                    }
                ],
            });
            await newCompletedQuiz.save();
            return res.status(201).json("Quiz added to 'Completed Quizzes' list");
        } else {
            completedQuizList.Quizzes.push({ lesson_Id: lessonId, score });
            await completedQuizList.save();
            return res.status(201).json({ message: "Quiz added to 'Completed Quizzes' list successfully" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};

// Fetch quizzes in the CompletedQuiz list based on userId
exports.fetchCompletedQuizzes = async (req, res) => {
    const { userId } = req.user;

    try {
        let completedQuizList = await CompletedQuiz.findOne({ userId });

        if (!completedQuizList) {
            return res.status(404).json({ message: "'Completed Quizzes' list not found" });
        }

        const quizzes = await Promise.all(
            completedQuizList.Quizzes.map(async (quiz) => {
                const lessonDetails = await Lesson.findOne({ id: quiz.lesson_Id }); // Update to use the correct field name _id
                return {
                    lessonId: lessonDetails.id, // Use _id instead of id
                    lessonName: lessonDetails.lessonName,
                    image: lessonDetails.image,
                    category: lessonDetails.category,
                    score: quiz.score,
                    completedAt: quiz.completedAt
                };
            })
        );

        return res.status(200).json({ quizzes });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};

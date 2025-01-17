const AttemptLater = require("../models/AttemptLaterModel");
const Lesson = require("../models/LessonModel");

// Add lessons to the AttemptLater list
exports.addLesson = async (req, res) => {
    const { userId } = req.user;
    const { lessonId } = req.body;
    
    try {
        let attemptLaterList = await AttemptLater.findOne({ userId });

        // If the user doesn't have an AttemptLater list, create a new one
        if (!attemptLaterList) {
            const newAttemptLater = new AttemptLater({
                userId,
                Lessons: [
                    {
                        lesson_Id: lessonId,
                    }
                ],
            });
            await newAttemptLater.save();
            return res.json("Lesson added to 'Attempt Later' list");
        } else {
            const lessonExists = attemptLaterList.Lessons.some((lesson) => lesson.lesson_Id === lessonId);
            if (!lessonExists) {
                attemptLaterList.Lessons.push({ lesson_Id: lessonId });
            }
            await attemptLaterList.save();
            return res.status(201).json({ message: "Lesson added to 'Attempt Later' list successfully" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};

// Fetch lessons in the AttemptLater list
exports.fetchAttemptLaterList = async (req, res) => {
    const { userId } = req.user;

    try {
        let attemptLaterList = await AttemptLater.findOne({ userId });

        if (!attemptLaterList) {
            return res.status(404).json({ message: "'Attempt Later' list not found" });
        }

        const lessons = await Promise.all(
            attemptLaterList.Lessons.map(async (lesson) => {
                const lessonDetails = await Lesson.findOne({ id: lesson.lesson_Id }); // Update to use the correct field name _id
                return {
                    lessonId: lessonDetails.id, // Use _id instead of id
                    lessonName: lessonDetails.lessonName,
                    image: lessonDetails.image,
                    category: lessonDetails.category,
                };
            })
        );

        return res.status(200).json({ lessons });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};

// Remove lesson from the AttemptLater list
exports.deleteAttemptLaterList = async (req, res) => {
    const { userId } = req.user;
    const lessonId = req.params.id;
    console.log(userId,lessonId);
    try {
        let attemptLaterList = await AttemptLater.findOne({ userId });
        console.log(attemptLaterList);
        if (!attemptLaterList) {
            return res.status(404).json({ message: "'Attempt Later' list is empty" });
        }

        // Filter out the lesson to be removed
        const updatedLessons = attemptLaterList.Lessons.filter((lesson) => lesson.lesson_Id !== lessonId);

        if (attemptLaterList.Lessons.length === updatedLessons.length) {
            return res.status(404).json({ message: "Lesson not found in the list" });
        }

        attemptLaterList.Lessons = updatedLessons;

        if (updatedLessons.length === 0) {
            // If no lessons are left, delete the list
            await AttemptLater.deleteOne({ userId });
            return res.status(200).json({ message: "'Attempt Later' list is now empty" });
        } else {
            // Otherwise, save the updated list
            await attemptLaterList.save();
            return res.status(200).json({ message: "Lesson removed from 'Attempt Later' list", attemptLaterList });
        }
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};
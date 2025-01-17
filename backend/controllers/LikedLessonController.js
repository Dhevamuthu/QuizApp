const LikedLesson = require("../models/LikedLessonModel");
const Lesson = require("../models/LessonModel");

// Add lessons to the LikedLesson list
exports.addLikedLesson = async (req, res) => {
    const { userId } = req.user;
    const { lessonId } = req.body;
    
    try {
        let likedLessonList = await LikedLesson.findOne({ userId });

        // If the user doesn't have a LikedLesson list, create a new one
        if (!likedLessonList) {
            const newLikedLesson = new LikedLesson({
                userId,
                Lessons: [
                    {
                        lesson_Id: lessonId,
                    }
                ],
            });
            await newLikedLesson.save();
            return res.json("Lesson added to 'Liked Lessons' list");
        } else {
            const lessonExists = likedLessonList.Lessons.some((lesson) => lesson.lesson_Id === lessonId);
            if (!lessonExists) {
                likedLessonList.Lessons.push({ lesson_Id: lessonId });
            }
            await likedLessonList.save();
            return res.status(201).json({ message: "Lesson added to 'Liked Lessons' list successfully" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};

// Fetch lessons in the LikedLesson list
exports.fetchLikedLessonList = async (req, res) => {
    const { userId } = req.user;

    try {
        let likedLessonList = await LikedLesson.findOne({ userId });

        if (!likedLessonList) {
            return res.status(404).json({ message: "'Liked Lessons' list not found" });
        }

        const lessons = await Promise.all(
            likedLessonList.Lessons.map(async (lesson) => {
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

// Remove lesson from the LikedLesson list
exports.deleteLikedLesson = async (req, res) => {
    const { userId } = req.user;
    const lessonId = req.params.id;
    console.log(userId, lessonId);
    try {
        let likedLessonList = await LikedLesson.findOne({ userId });
        console.log(likedLessonList);
        if (!likedLessonList) {
            return res.status(404).json({ message: "'Liked Lessons' list is empty" });
        }

        // Filter out the lesson to be removed
        const updatedLessons = likedLessonList.Lessons.filter((lesson) => lesson.lesson_Id !== lessonId);

        if (likedLessonList.Lessons.length === updatedLessons.length) {
            return res.status(404).json({ message: "Lesson not found in the list" });
        }

        likedLessonList.Lessons = updatedLessons;

        if (updatedLessons.length === 0) {
            // If no lessons are left, delete the list
            await LikedLesson.deleteOne({ userId });
            return res.status(200).json({ message: "'Liked Lessons' list is now empty" });
        } else {
            // Otherwise, save the updated list
            await likedLessonList.save();
            return res.status(200).json({ message: "Lesson removed from 'Liked Lessons' list", likedLessonList });
        }
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};

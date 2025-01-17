const categoryController = require("../controllers/CategoryController");
const loginController= require("../controllers/LoginController");
const lessonController= require("../controllers/LessonController");
const AttemptlaterController= require("../controllers/AttemptLaterController");
const LikedLessonController = require('../controllers/LikedLessonController');
const CompletedLesson= require("../controllers/CompletedquizController");
const ProfileController= require("../controllers/ProfileController");
const QuizController= require("../controllers/QuizController");
const express = require("express");
const auth= require("../middlewares/auth");
const router = express.Router();

router.get("/get",categoryController.getCategories);
router.post("/adduser",loginController.postuser); //to add a new user to the logins.js
router.post("/auth",loginController.login);
router.patch('/update-profile',auth,ProfileController.updateUserProfile);
router.get("/myProfile",auth,ProfileController.getUserProfile)
router.get("/getlesson/:name",lessonController.getLessons);
router.post("/addlesson",lessonController.createLesson);
router.post("/addattemptlater",auth,AttemptlaterController.addLesson);
router.get("/fetchattemptlater",auth,AttemptlaterController.fetchAttemptLaterList);
router.delete("/deleteattempt/:id",auth,AttemptlaterController.deleteAttemptLaterList);
router.post("/addlikedlesson", auth, LikedLessonController.addLikedLesson);
router.get("/fetchlikedlessons", auth, LikedLessonController.fetchLikedLessonList);
router.delete("/deletelikedlesson/:id", auth, LikedLessonController.deleteLikedLesson);
router.post("/compquiz",auth,CompletedLesson.addCompletedQuiz);
router.get("/fetchcompquiz",auth,CompletedLesson.fetchCompletedQuizzes);
router.post("/quizzes",QuizController.addMultipleQuizzes);
router.get("/quiz/:lessonId",auth,QuizController.getQuizByLessonId);
module.exports = router;

const mongoose= require('mongoose');

const LessonSchema= new mongoose.Schema({
    id:String,
    lessonName:String,
    image: String,
    category:String
})

const lessons= new mongoose.model('Lessons',LessonSchema)
module.exports=lessons;
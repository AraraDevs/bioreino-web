const mongoose = require('mongoose');

const LessonProgress = new mongoose.Schema({
  lessonId: { type: String, required: true },
  complete: { type: Boolean, required: true },
});

const CourseId = new mongoose.Schema({
  courseId: { type: String, required: true },
  lessonProgress: { type: [LessonProgress] },
});

const LastCourse = new mongoose.Schema({
  courseId: { type: String, required: true },
  lastLesson: { type: String, required: true },
});

const User = new mongoose.Schema({
  cpf: { type: String, required: true },
  name: { type: String, required: true },
  plan: { type: String, required: true },
  subscription: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  progressArray: { type: [CourseId], required: true },
  lastCourse: { LastCourse },
});

module.exports = mongoose.model('Student', User);

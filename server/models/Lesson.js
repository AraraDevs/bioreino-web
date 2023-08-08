const mongoose = require('../db/conn');

const Lesson = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    courseTitle: { type: String, required: true },
    transcription: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model('Lesson', Lesson);

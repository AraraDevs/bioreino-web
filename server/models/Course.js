const mongoose = require('../db/conn');

const Course = new mongoose.Schema(
  {
    title: { type: String, required: true },
    professor: { type: String, required: true },
    imageUrl: { type: String, required: true },
    plan: { type: String, required: true },
    category: { type: String, required: true },
    lessons: { type: Array, required: true },
    slug: { type: String, required: true }
  },
  { timestamps: true },
);

module.exports = mongoose.model('Course', Course);

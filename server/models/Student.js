const mongoose = require('../db/conn');

const Student = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    plan: { type: mongoose.ObjectId, required: true },
    password: { type: String, required: true },
    coursesProgress: Object,
    lastCourse: Object,
    professor: Boolean,
  },
  { timestamps: true },
);

module.exports = mongoose.model('Student', Student);

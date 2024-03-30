const mongoose = require('../db/conn');

const Student = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    plan: { type: mongoose.Types.ObjectId, required: true },
    password: { type: String, required: true },
    coursesProgress: {
      type: [
        {
          _id: mongoose.Types.ObjectId,
          title: { type: String, required: true },
          progress: { type: Number, required: true },
          lessonsViewed: [mongoose.Types.ObjectId],
        },
      ],
      default: [],
    },
    lastCourse: Object,
    expiresAfter: {
      type: Date,
      select: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', Student);

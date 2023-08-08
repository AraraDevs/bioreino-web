const mongoose = require('../db/conn');

const Category = new mongoose.Schema(
  {
    name: { type: String, required: true },
    plan: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('categories', Category);

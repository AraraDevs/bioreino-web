const mongoose = require('../db/conn');

const Plan = new mongoose.Schema({
  name: { type: String, required: true },
  benefits: { type: Array, required: true },
  price: { type: String, required: true },
});

module.exports = mongoose.model('Plan', Plan);

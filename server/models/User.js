const mongoose = require('mongoose');

const Student = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  cpf: { type: String, required: true },
  plan: { type: String, required: true },
  subscriptionDate: { type: Date, default: Date.now },
  password: { type: String, required: true },
  progressArray: [Object],
});

module.exports = mongoose.model('Student', Student);

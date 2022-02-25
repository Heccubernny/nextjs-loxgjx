const mongoose = require('mongoose');

const optionModelSchema = new mongoose.Schema({
  options: [{}],
  selected: [{ type: Number, default: 0 }],
});

const choiceModelSchema = new mongoose.Schema({
  username: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // email: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  question: String,
  options: [optionModelSchema],
  selected: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  created_on: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Choice', choiceModelSchema);

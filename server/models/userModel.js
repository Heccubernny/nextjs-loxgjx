const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userModelSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_on: {
    type: Date,
    default: Date.now(),
  },

  choices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Choice' }],
});

userModelSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    // hashing our password with bcryptjs
    const hashed = await bcrypt.hash(this.password, 12);
    this.password = hashed;
    return next();
  } catch {
    return next(err);
  }
});

module.exports = mongoose.model('User', userModelSchema);

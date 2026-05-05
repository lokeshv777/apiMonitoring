const mongoose = require('mongoose');

const userSchmea = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchmea);

module.exports = User;

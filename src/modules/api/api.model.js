const mongoose = require('mongoose');

const apiSchema = new mongoose.Schema(
  {
    // Which user owns this API
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // API URL to monitor
    url: {
      type: String,
      required: true,
      trim: true,
    },

    // HTTP Method
    method: {
      type: String,
      enum: ['GET', 'POST', 'PUT', 'DELETE'],
      default: 'GET',
    },

    // Expected status code
    expectedStatus: {
      type: Number,
      default: 200,
    },

    // Monitoring interval (minutes)
    interval: {
      type: Number,
      default: 1,
    },

    // Enable/Disable monitoring
    isActive: {
      type: Boolean,
      default: true,
    },

    // Prevent duplicate alerts
    isAlertSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Api = mongoose.model('Api', apiSchema);

module.exports = Api;

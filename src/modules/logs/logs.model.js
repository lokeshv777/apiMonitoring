const mongoose = require('mongoose');

const logsSchema = new mongoose.Schema(
  {
    // Which API this log belongs to
    apiId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Api',
      required: true,
    },

    // Which user owns this API
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // API status: UP or DOWN
    status: {
      type: String,
      enum: ['UP', 'DOWN'],
      required: true,
    },

    // HTTP status code
    statusCode: {
      type: Number,
    },

    // Response time in ms
    responseTime: {
      type: Number,
    },

    // Error message if failed
    error: {
      type: String,
    },
  },
  { timestamps: true },
);

const Log = mongoose.model('Log', logsSchema);

module.exports = Log;

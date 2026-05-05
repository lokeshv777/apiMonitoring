const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // const conn = await mongoose.connect(process.env.MONGO_URI);
    const conn = await mongoose.connect(process.env.ATLAS_URL);

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`MongoDB connection failed:`, error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

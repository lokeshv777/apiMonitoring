require('dotenv').config();
require('./jobs/cron');

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('ATLAS_URL:', process.env.ATLAS_URL);
  console.log('JWT_SECRET:', process.env.JWT_SECRET);
});

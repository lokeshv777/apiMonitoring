const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authRoutes = require('./modules/auth/auth.routes');
const apiRoutes = require('./modules/api/api.routes');
const logsRoutes = require('./modules/logs/logs.routes');

const app = express();

// Security middleware
app.use(helmet());

// Enable CORS
app.use(cors());

// Logging
app.use(morgan('dev'));

// Body parser
app.use(express.json());

app.use('/auth', authRoutes);

app.use('/api', apiRoutes);

app.use('/logs', logsRoutes);

app.get('/', (req, res) => {
  res.send('API Monitoring SaaS Running');
});

module.exports = app;

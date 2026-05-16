const express = require('express');

const router = express.Router();

const authMiddleware = require('../../middlewares/auth.middleware');

const { getLogs } = require('./logs.controller');

const { getMetrics } = require('./metrics.controller');

router.get('/:apiId', authMiddleware, getLogs);

router.get('/metrics/:apiId', authMiddleware, getMetrics);

module.exports = router;

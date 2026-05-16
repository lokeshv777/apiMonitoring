const Log = require('./logs.model');
const { redisClient } = require('../../config/redis');

const getApiMetrics = async (userId, apiId) => {
  const cacheKey = `metrics:${apiId}`;

  const cacheData = await redisClient.get(cacheKey);

  if (cacheData) {
    console.log('⚡ Cache HIT');

    return JSON.parse(cacheData);
  }

  console.log('❌ Cache MISS');

  const logs = await Log.find({ apiId, userId });

  const totalChecks = logs.length;
  console.log(totalChecks);

  if (totalChecks === 0) {
    return {
      uptime: 0,
      downtime: 0,
      avgResponseTime: 0,
      totalChecks: 0,
      successChecks: 0,
      failedChecks: 0,
    };
  }

  let successChecks = 0;
  let failedChecks = 0;
  let totalResponseTime = 0;

  for (const log of logs) {
    if (log.status === 'UP') {
      successChecks++;
    } else {
      failedChecks++;
    }

    if (log.responseTime) {
      totalResponseTime += log.responseTime;
    }
  }

  const uptime = (successChecks / totalChecks) * 100;
  const downtime = (failedChecks / totalChecks) * 100;
  const avgResponseTime = totalResponseTime / totalChecks;

  const metrics = {
    uptime: uptime.toFixed(2),
    downtime: downtime.toFixed(2),
    avgResponseTime: Math.round(avgResponseTime),
    totalChecks,
    successChecks,
    failedChecks,
  };

  await redisClient.set(cacheKey, JSON.stringify(metrics), {
    EX: 60,
  });

  return metrics;
};

module.exports = { getApiMetrics };

const Log = require('./logs.model');

const getApiMetrics = async (userId, apiId) => {
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

  return {
    uptime: uptime.toFixed(2),
    downtime: downtime.toFixed(2),
    avgResponseTime: Math.round(avgResponseTime),
    totalChecks,
    successChecks,
    failedChecks,
  };
};

module.exports = { getApiMetrics };

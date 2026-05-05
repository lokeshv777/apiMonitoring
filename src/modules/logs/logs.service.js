const Log = require('./logs.model');

// Get Logs Service
const getLogsByApi = async (userId, apiId) => {
  const logs = await Log.find({
    apiId,
    userId,
  })
    .sort({ createdAt: -1 })
    .limit(50); // limit to latest 50 logs

  return logs;
};

module.exports = { getLogsByApi };

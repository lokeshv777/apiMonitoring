const { getLogsByApi } = require('./logs.service');

// Get Logs Controller
const getLogs = async (req, res) => {
  try {
    const userId = req.user._id;
    const apiId = req.params.apiId;

    const logs = await getLogsByApi(userId, apiId);

    res.status(200).json({
      success: true,
      count: logs.length,
      data: logs,
    });
  } catch (error) {
    console.log('ERROR:', error); // ⭐ ADD THIS

    res.status(500).json({
      success: false,
      message: error.message, // show real error
    });
  }
};

module.exports = { getLogs };

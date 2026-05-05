const { getApiMetrics } = require('./metrics.service');

const getMetrics = async (req, res) => {
  try {
    const userId = req.user._id;
    const apiId = req.params.apiId;

    const metrics = await getApiMetrics(userId, apiId);

    res.status(200).json({
      success: true,
      data: metrics,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getMetrics };

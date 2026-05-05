const { createApi, getApis, updateApi, deleteApi } = require('./api.service');

const addApi = async (req, res) => {
  try {
    const userId = req.user._id;

    const api = await createApi(userId, req.body);

    res.status(201).json({
      success: true,
      message: 'API added successfully',
      data: api,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get APIs Controller
const listApis = async (req, res) => {
  try {
    const userId = await req.user._id;
    const apis = await getApis(userId);

    res.status(200).json({
      success: true,
      count: apis.length,
      result: apis,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Server error',
    });
  }
};

// Update API Controller
const editApi = async (req, res) => {
  try {
    const userId = req.user._id;
    const apiId = req.params.id;

    const updatedApi = await updateApi(userId, apiId, req.body);

    res.status(200).json({
      success: true,
      message: 'Api updated successfully',
      data: updatedApi,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

const removeApi = async (req, res) => {
  try {
    const userId = req.user._id;
    const apiId = req.params.id;

    const result = await deleteApi(userId, apiId);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { addApi, listApis, editApi, removeApi };

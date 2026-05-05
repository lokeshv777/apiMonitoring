const Api = require('./api.model');

// Create API Service
const createApi = async (userId, data) => {
  // Check duplicate API
  const existingApi = await Api.findOne({ userId, url: data.url });

  if (existingApi) {
    throw new Error('API already exists');
  }

  // Create new API
  const api = await Api.create({
    userId,
    ...data,
  });

  return api;
};

const getApis = async (userId) => {
  const apis = await Api.find({ userId }).sort({ createdAt: -1 });
  return apis;
};

const updateApi = async (userId, apiId, data) => {
  // Find API
  const api = await Api.findById(apiId);

  if (!api) {
    throw new Error('Api not found');
  }

  // Check ownership
  if (api.userId.toString() !== userId.toString()) {
    throw new Error('Unauthorized');
  }

  // Update API
  const updatedApi = await Api.findByIdAndUpdate(apiId, data, { new: true });

  return updatedApi;
};

// Delete API Service
const deleteApi = async (userId, apiId) => {
  // Find API
  const api = await Api.findById(apiId);

  if (!api) {
    throw new Error('Api not found');
  }

  if (api.userId.toString() !== userId.toString()) {
    throw new Error('Unauthorized');
  }

  await Api.findByIdAndDelete(apiId);

  return {
    message: 'Api deleted successfully',
  };
};

module.exports = { createApi, getApis, updateApi, deleteApi };

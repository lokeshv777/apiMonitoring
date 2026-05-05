const express = require('express');

const router = express.Router();

const authMiddelware = require('../../middlewares/auth.middleware');
const validationMiddelware = require('../../middlewares/validate.middleware');
const {
  createApiValidation,
  updateApiValidation,
} = require('./api.validation');
const { addApi, listApis, editApi, removeApi } = require('./api.controller');

router.post(
  '/',
  authMiddelware,
  createApiValidation,
  validationMiddelware,
  addApi,
);

router.get('/', authMiddelware, listApis);

router.put(
  '/:id',
  authMiddelware,
  updateApiValidation,
  validationMiddelware,
  editApi,
);

router.delete('/:id', authMiddelware, removeApi);

module.exports = router;

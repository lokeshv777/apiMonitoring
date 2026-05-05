const express = require('express');
const router = express.Router();

const {
  register,
  login,
  getProfile,
  refreshToken,
  logout,
} = require('./auth.controller');
const { registerValidation, loginValidation } = require('./auth.validation');
const validateMiddleware = require('../../middlewares/validate.middleware');
const authMiddleware = require('../../middlewares/auth.middleware');

router.post('/register', registerValidation, validateMiddleware, register);
router.post('/login', loginValidation, validateMiddleware, login);
router.get('/profile', authMiddleware, getProfile);
router.post('/refresh', refreshToken);
router.post('/logout', authMiddleware, logout);

module.exports = router;

const { body } = require('express-validator');

// Register Validation Rules
const registerValidation = [
  body('email').isEmail().withMessage('Valid email is required'),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

// Login Validation Rules
const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),

  body('password').notEmpty().withMessage('Password is required'),
];

module.exports = {
  registerValidation,
  loginValidation,
};

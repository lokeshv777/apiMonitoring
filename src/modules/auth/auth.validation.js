const { body } = require('express-validator');

// Register Validation Rules
const registerValidation = [
  body('email').isEmail().withMessage('Valid email is required'),

  body('password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    )
    .withMessage(
      'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character',
    ),
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

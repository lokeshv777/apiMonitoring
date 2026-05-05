const { body } = require('express-validator');

const createApiValidation = [
  body('url')
    .notEmpty()
    .withMessage('URL is required')
    .isURL()
    .withMessage('Invalid URL format'),

  body('method')
    .optional()
    .isIn(['GET', 'POST', 'PUT', 'DELETE'])
    .withMessage('Invalid HTTP method'),

  body('expectedStatus')
    .optional()
    .isNumeric()
    .withMessage('Expected status must be number'),

  body('interval')
    .optional()
    .isNumeric()
    .withMessage('Interval must be number'),
];

const updateApiValidation = [
  body('url').optional().isURL().withMessage('Invalid URL format'),

  body('method')
    .optional()
    .isIn(['GET', 'POST', 'PUT', 'DELETE'])
    .withMessage('Invalid HTTP method'),

  body('expectedStatus')
    .optional()
    .isNumeric()
    .withMessage('Expected status must be number'),

  body('interval')
    .optional()
    .isNumeric()
    .withMessage('Interval must be number'),

  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be boolean'),
];

module.exports = { createApiValidation, updateApiValidation };

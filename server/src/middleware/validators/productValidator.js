import { body, param, validationResult } from 'express-validator';

export const validateProductCreate = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ min: 1, max: 100 })
    .withMessage('Product name must be between 1 and 100 characters'),
  handleValidationErrors,
];

export const validateProductUpdate = [
  param('name').trim().notEmpty().withMessage('Product name parameter is required'),
  body('name')
    .trim()
    .notEmpty()
    .withMessage('New product name is required')
    .isLength({ min: 1, max: 100 })
    .withMessage('Product name must be between 1 and 100 characters'),
  handleValidationErrors,
];

export const validateProductDelete = [
  param('name').trim().notEmpty().withMessage('Product name parameter is required'),
  handleValidationErrors,
];

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'invalid product, name is missing',
    });
  }
  next();
}

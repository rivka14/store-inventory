import { body, validationResult } from 'express-validator';

export const validateInventorySave = [
  body('items').isArray().withMessage('Request body must contain an items array'),
  body('items.*.name')
    .trim()
    .notEmpty()
    .withMessage('Each item must have a name'),
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Each item must have a positive quantity'),
  handleValidationErrors,
];

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Some of the inventory items are missing attribute: "name" or "quantity"',
    });
  }
  next();
}

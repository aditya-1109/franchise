import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateLead = [
  body('name').notEmpty().withMessage('Lead name is required'),
  body('email').isEmail().withMessage('Enter a valid email address'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('status').optional().isIn(['new', 'contacted', 'in-progress', 'converted']).withMessage('Invalid status'),
  body('campaignId').isInt({ gt: 0 }).withMessage('Valid campaignId is required'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];

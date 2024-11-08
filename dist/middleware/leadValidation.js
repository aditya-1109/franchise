"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLead = void 0;
const express_validator_1 = require("express-validator");
exports.validateLead = [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Lead name is required'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Enter a valid email address'),
    (0, express_validator_1.body)('phone').notEmpty().withMessage('Phone number is required'),
    (0, express_validator_1.body)('status').optional().isIn(['new', 'contacted', 'in-progress', 'converted']).withMessage('Invalid status'),
    (0, express_validator_1.body)('campaignId').isInt({ gt: 0 }).withMessage('Valid campaignId is required'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        next();
    },
];

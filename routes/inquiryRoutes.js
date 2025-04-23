const express = require('express');
const { body } = require('express-validator');
const { createInquiry } = require('../controllers/inquiryController');

const router = express.Router();

router.post('/inquiries', [
    body('fullname').notEmpty().withMessage('Full name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phonenumber').notEmpty().withMessage('Phone number is required'),
    body('inquiry_subject').notEmpty().withMessage('Inquiry subject is required'),
    body('preferred_contact').isIn(['email', 'phone']).withMessage('Preferred contact must be email or phone'),
], createInquiry);

module.exports = router;

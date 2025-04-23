const express = require('express');
const { body } = require('express-validator');
const { createInquiry, getAllInquiries,getInquiryById,updateInquiryStatus} = require('../controllers/inquiryController');

const router = express.Router();

router.post('/create', [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phonenumber').notEmpty().withMessage('Phone number is required'),
    body('message').notEmpty().withMessage('Message is required'),
    body('subject').notEmpty().withMessage('Subject is required'),
    body('inquiry_Type')
        .isIn([
            'General Inquiry',
            'Services Information',
            'Opportunities',
            'Partnership',
            'others',
        ])
        .withMessage('Invalid inquiry type'),
], createInquiry);


router.get('/', getAllInquiries);
router.get('/:id', getInquiryById);

router.put('/:id', updateInquiryStatus);

module.exports = router;

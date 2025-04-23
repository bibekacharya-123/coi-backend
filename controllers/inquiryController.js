const Inquiry = require('../models/Inquiry');
const { validationResult } = require('express-validator');

const createInquiry = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const inquiry = new Inquiry(req.body);
        await inquiry.save();
        res.status(201).json({ message: 'Inquiry submitted successfully', inquiry });
    } catch (error) {
        console.error('Inquiry creation failed:', error.message);
        res.status(500).json({ error: error.message || 'Server error' });
    }
};

module.exports = { createInquiry };

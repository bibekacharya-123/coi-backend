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
 
const getAllInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find();
        res.status(200).json(inquiries);
    } catch (error) {
        console.error('Failed to fetch inquiries:', error.message);
        res.status(500).json({ error: error.message || 'Server error' });
    }
};
const getInquiryById = async (req, res) => {
    const { id } = req.params;
    try {
        const inquiry = await Inquiry.findById(id);
        if (!inquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }
        res.status(200).json(inquiry);
    } catch (error) {
        console.error('Failed to fetch inquiry:', error.message);
        res.status(500).json({ error: error.message || 'Server error' });
    }
};

const updateInquiryStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const inquiry = await Inquiry.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        ); 
        if (!inquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }
        console.log(`Updated status for inquiry ${id}: ${inquiry.status}`); // Log the updated status
        res.status(200).json({ message: 'Inquiry status updated successfully', inquiry });
    }
    catch (error) {
        console.error('Failed to update inquiry status:', error.message);
        res.status(500).json({ error: error.message || 'Server error' });
    }
};

module.exports = { createInquiry, getAllInquiries, getInquiryById, updateInquiryStatus };

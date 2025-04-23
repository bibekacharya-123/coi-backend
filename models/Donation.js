const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  countries: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'resolved'], 
    default: 'pending' 
  },
  donationFrequency: {
    type: String,
    enum: [
      'One-time donation',
      'Monthly donation',
      'Quarterly donation',
      'Annual donation'
    ],
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Donation', donationSchema);

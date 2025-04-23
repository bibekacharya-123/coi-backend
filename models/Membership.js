const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  additionalReasons: { type: String },
  status: { 
    type: String, 
    enum: ['pending', 'resolved'], 
    default: 'pending' 
  },
  reasonForApplying: {
    type: String,
    enum: [
      'Professional Development',
      'Networking Opportunities',
      'Certificate and Recognization',
      'Publication Opportunities',
      'Access to Events',
      'Join a Community of Changemakers'
    ],
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Membership', membershipSchema);

const mongoose = require('mongoose');

const ambassadorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  reason: { type: String, required: true },
  accepted: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ['pending', 'resolved'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Ambassador', ambassadorSchema);

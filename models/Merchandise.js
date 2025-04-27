const mongoose = require('mongoose');

const merchandiseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: String, required: true },
  productCode: { type: String, required: true },
  paymentMethod: {
    type: String,
    enum: ['bank transfer', 'cash on delivery', 'pay pal', 'esewa'],
    required: true
  },
  fullDeliveryAddress: { type: String, required: true },
  size: {
    type: String,
    enum: ['xs', 's', 'm', 'l', 'xl', 'xxl'],
    required: true
  },
  priceRange: { type: String, required: true },
  message: { type: String },
  status: {
    type: String,
    enum: ['pending', 'resolved'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Merchandise', merchandiseSchema);

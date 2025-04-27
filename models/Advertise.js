const mongoose = require('mongoose');

const advertiseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  isAccepted: { type: Boolean, default: false },
  document: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Advertise', advertiseSchema);

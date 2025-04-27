// models/Service.js
const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const serviceSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: String,
  subtitle: String,
  description: String,
  image: String,
  detailedDescription: [String],
  features: [featureSchema],
  benefits: [String],
});

module.exports = mongoose.model('Service', serviceSchema);
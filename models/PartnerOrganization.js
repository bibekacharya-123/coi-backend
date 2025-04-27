const mongoose = require('mongoose');

const partnerOrganizationSchema = new mongoose.Schema({
  nameOfOrganization: { type: String, required: true },
  nameOfChiefOrganization: { type: String },
  chiefInOrganization: { type: String },
  numberOfChief: { type: Number },
  registered: { type: String, enum: ['Yes', 'No'], required: true },
  registrationNumber: { type: String },
  emailAddressOrganization: { type: String, required: true },
  website: { type: String },
  facebookPage: { type: String, required: true },
  projectExperience: { type: String },
  logo: { type: String, required: true },
  nameOfApplicant: { type: String, required: true },
  positionOfApplicant: { type: String, required: true },
  whatsappOfApplicant: { type: String, required: true },
  emailOfApplicant: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Resolved'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('PartnerOrganization', partnerOrganizationSchema);

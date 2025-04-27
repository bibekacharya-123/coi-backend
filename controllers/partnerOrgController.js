const PartnerOrganization = require('../models/PartnerOrganization');

exports.createPartnerOrganization = async (req, res) => {
  try {
    const {
      nameOfOrganization,
      nameOfChiefOrganization,
      chiefInOrganization,
      numberOfChief,
      registered,
      registrationNumber,
      emailAddressOrganization,
      website,
      facebookPage,
      projectExperience,
      nameOfApplicant,
      positionOfApplicant,
      whatsappOfApplicant,
      emailOfApplicant
    } = req.body;

    const logo = req.file ? req.file.filename : null;
    if (!logo) return res.status(400).json({ message: 'Logo is required.' });

    const newOrg = new PartnerOrganization({
      nameOfOrganization,
      nameOfChiefOrganization,
      chiefInOrganization,
      numberOfChief,
      registered,
      registrationNumber,
      emailAddressOrganization,
      website,
      facebookPage,
      projectExperience,
      logo,
      nameOfApplicant,
      positionOfApplicant,
      whatsappOfApplicant,
      emailOfApplicant
    });

    await newOrg.save();
    res.status(201).json({ message: 'Organization registered successfully', data: newOrg });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllPartnerOrganizations = async (req, res) => {
  try {
    const data = await PartnerOrganization.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching organizations' });
  }
};

exports.getPartnerOrganizationById = async (req, res) => {
  try {
    const org = await PartnerOrganization.findById(req.params.id);
    if (!org) return res.status(404).json({ message: 'Organization not found' });
    res.json(org);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching organization' });
  }
};

exports.updatePartnerOrganization = async (req, res) => {
  try {
    const updates = req.body;
    const updated = await PartnerOrganization.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!updated) return res.status(404).json({ message: 'Organization not found' });
    res.json({ message: 'Organization updated successfully', data: updated });
  } catch (error) {
    res.status(500).json({ message: 'Error updating organization' });
  }
};

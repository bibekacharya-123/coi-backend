const Membership = require('../models/Membership');

// Create new membership
exports.createMembership = async (req, res) => {
  try {
    const membership = await Membership.create(req.body);
    res.status(201).json(membership);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get membership by ID
exports.getMembershipById = async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id);
    if (!membership) return res.status(404).json({ message: 'Membership not found' });
    res.json(membership);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update membership status
exports.updateMembershipStatus = async (req, res) => {
  try {
    const membership = await Membership.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!membership) return res.status(404).json({ message: 'Membership not found' });
    res.json(membership);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all memberships
exports.getAllMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find().sort({ createdAt: -1 });
    res.json(memberships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

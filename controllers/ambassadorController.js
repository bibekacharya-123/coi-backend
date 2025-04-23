const Ambassador = require('../models/Ambassador');

// Create ambassador request
exports.createAmbassador = async (req, res) => {
  try {
    const ambassador = await Ambassador.create(req.body);
    res.status(201).json(ambassador);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get ambassador by ID
exports.getAmbassadorById = async (req, res) => {
  try {
    const ambassador = await Ambassador.findById(req.params.id);
    if (!ambassador) return res.status(404).json({ message: 'Ambassador not found' });
    res.json(ambassador);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update status and acceptance
exports.updateAmbassador = async (req, res) => {
  try {
    const ambassador = await Ambassador.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, accepted: req.body.accepted },
      { new: true }
    );
    if (!ambassador) return res.status(404).json({ message: 'Ambassador not found' });
    res.json(ambassador);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all ambassadors
exports.getAllAmbassadors = async (req, res) => {
  try {
    const ambassadors = await Ambassador.find().sort({ createdAt: -1 });
    res.json(ambassadors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

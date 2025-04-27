const Merchandise = require('../models/Merchandise');

// Create Merchandise
exports.createMerchandise = async (req, res) => {
  try {
    const newMerch = new Merchandise(req.body);
    const saved = await newMerch.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update Merchandise Status
exports.updateMerchandiseStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'resolved'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value.' });
    }

    const updated = await Merchandise.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Order not found.' });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllMerchandise = async (req, res) => {
  try {
    const merchandise = await Merchandise.find();
    res.status(200).json(merchandise);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getMerchandiseById = async (req, res) => {
  try {
    const { id } = req.params;
    const merchandise = await Merchandise.findById(id);
    if (!merchandise) return res.status(404).json({ error: 'Order not found.' });
    res.status(200).json(merchandise);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
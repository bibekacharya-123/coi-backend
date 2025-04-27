const Advertise = require('../models/Advertise');

exports.createAdvertise = async (req, res) => {
  try {
    const { name, email } = req.body;
    const document = req.file?.filename;

    if (!name || !email || !document) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newAd = new Advertise({ name, email, document });
    await newAd.save();
    res.status(201).json(newAd);
  } catch (error) {
    res.status(500).json({ message: 'Error creating entry' });
  }
};

exports.getAllAds = async (req, res) => {
  try {
    const ads = await Advertise.find().sort({ createdAt: -1 });
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
  }
};

exports.updateAdStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isAccepted } = req.body;

    const ad = await Advertise.findByIdAndUpdate(id, { isAccepted }, { new: true });
    if (!ad) return res.status(404).json({ message: 'Ad not found' });

    res.json(ad);
  } catch (error) {
    res.status(500).json({ message: 'Error updating status' });
  }
};

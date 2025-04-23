// controllers/faqController.js
const Faq = require("../models/Faq");

// Create FAQ
exports.createFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const newFaq = new Faq({ question, answer });
    await newFaq.save();
    res.status(201).json(newFaq);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete FAQ
exports.deleteFaq = async (req, res) => {
  try {
    await Faq.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "FAQ deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get FAQ by ID
exports.getFaqById = async (req, res) => {
  try {
    const faq = await Faq.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }
    res.status(200).json(faq);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

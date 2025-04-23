// routes/faqRoutes.js
const express = require("express");
const { createFaq, deleteFaq, getFaqById } = require("../controllers/faqController");

const router = express.Router();

router.post("/", createFaq);        // Create FAQ
router.delete("/:id", deleteFaq);  // Delete FAQ by ID
router.get("/:id", getFaqById);    // Get FAQ by ID

module.exports = router;

const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');

router.post('/create', donationController.createDonation);
router.get('/:id', donationController.getDonationById);
router.put('/:id', donationController.updateDonationStatus);
router.get('/', donationController.getAllDonations);

module.exports = router;

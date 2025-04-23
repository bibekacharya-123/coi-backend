const express = require('express');
const router = express.Router();
const membershipController = require('../controllers/membershipController');

router.post('/create', membershipController.createMembership);
router.get('/:id', membershipController.getMembershipById);
router.put('/:id', membershipController.updateMembershipStatus);
router.get('/', membershipController.getAllMemberships);

module.exports = router;

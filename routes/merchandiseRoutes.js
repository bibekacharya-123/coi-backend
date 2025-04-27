const express = require('express');
const router = express.Router();
const {
  createMerchandise,
  updateMerchandiseStatus,
  getAllMerchandise, // Added import
  getMerchandiseById // Added import
} = require('../controllers/merchandiseController');
const { get } = require('mongoose');

// POST /api/merchandise - create order
router.post('/create', createMerchandise);

// PATCH /api/merchandise/:id/status - update status
router.put('/:id', updateMerchandiseStatus);

router.get('/',getAllMerchandise);
router.get('/:id', getMerchandiseById);

module.exports = router;

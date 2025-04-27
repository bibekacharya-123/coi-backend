const express = require('express');
const router = express.Router();
const upload = require('../middleware/documentMulter');
const { createAdvertise, getAllAds, updateAdStatus } = require('../controllers/advertiseController');

router.post('/create', upload.single('document'), createAdvertise);
router.get('/', getAllAds);
router.patch('/:id', updateAdStatus);

module.exports = router;

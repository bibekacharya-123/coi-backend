const express = require('express');
const router = express.Router();
const upload = require('../middleware/multiplemulter');
const serviceController = require('../controllers/serviceController');

router.post('/create', upload.single('image'), serviceController.createService);
router.put('/:id', upload.single('image'), serviceController.updateService);
router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById);
router.delete('/:id', serviceController.deleteService);

module.exports = router;

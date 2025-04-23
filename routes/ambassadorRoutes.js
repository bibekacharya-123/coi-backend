const express = require('express');
const router = express.Router();
const ambassadorController = require('../controllers/ambassadorController');

router.post('/create', ambassadorController.createAmbassador);
router.get('/:id', ambassadorController.getAmbassadorById);
router.put('/:id', ambassadorController.updateAmbassador);
router.get('/', ambassadorController.getAllAmbassadors);

module.exports = router;

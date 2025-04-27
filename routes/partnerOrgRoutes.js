const express = require('express');
const router = express.Router();
const upload = require('../middleware/multiplemulter'); // <- your file
const partnerOrgController = require('../controllers/partnerOrgController');

router.post('/register', upload.single('logo'), partnerOrgController.createPartnerOrganization);
router.get('/', partnerOrgController.getAllPartnerOrganizations);
router.get('/:id', partnerOrgController.getPartnerOrganizationById);
router.put('/:id', partnerOrgController.updatePartnerOrganization);

module.exports = router;

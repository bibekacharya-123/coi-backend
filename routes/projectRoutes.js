// File: routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const upload = require('../middleware/multipleMulter');

// Configure multer for multiple file fields
const multiUpload = {
  image: 'image',
  gallery: 'gallery'
};

// Apply multer middleware to handle both single image and gallery array
const uploadFields = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'gallery', maxCount: 10 }
]);

// Define routes
router.post('/create', uploadFields, projectController.createProject);
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.put('/:id', uploadFields, projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;
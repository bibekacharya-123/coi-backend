// File: controllers/projectController.js
const Project = require('../models/Project');
const fs = require('fs');
const path = require('path');

// Helper to process uploaded files
const processUploadedFiles = (req) => {
  const image = req.files && req.files.image ? `/uploads/${req.files.image[0].filename}` : null;
  
  let galleryImages = [];
  if (req.files && req.files.gallery) {
    galleryImages = req.files.gallery.map(file => `/uploads/${file.filename}`);
  }
  
  return { image, galleryImages };
};

// Helper to delete files from server
const deleteFile = (filePath) => {
  // Only delete if not a placeholder
  if (filePath && !filePath.includes('placeholder.svg')) {
    const fullPath = path.join(__dirname, '..', filePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  }
};

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const { title, duration, location, category, status, longDescription } = req.body;
    
    // Process objectives (convert from JSON string if needed)
    let objectives = req.body.objectives;
    if (typeof objectives === 'string') {
      objectives = JSON.parse(objectives);
    }
    
    // Process activities (convert from JSON string if needed)
    let activities = req.body.activities;
    if (typeof activities === 'string') {
      activities = JSON.parse(activities);
    }
    
    // Handle file uploads
    const { image, galleryImages } = processUploadedFiles(req);
    
    // Create new project
    const project = new Project({
      title,
      duration,
      location,
      category,
      status,
      longDescription,
      objectives,
      activities,
      image: image || '/placeholder.svg?height=400&width=800',
      gallery: galleryImages.length > 0 ? galleryImages : [
        '/placeholder.svg?height=200&width=300',
        '/placeholder.svg?height=200&width=300',
        '/placeholder.svg?height=200&width=300'
      ]
    });
    
    await project.save();
    
    res.status(201).json({
      success: true,
      data: project
    });
    
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
    
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get single project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: project
    });
    
  } catch (error) {
    console.error('Error fetching project:', error);
    
    // Handle invalid ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Update project
exports.updateProject = async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }
    
    // Process text fields
    const { title, duration, location, category, status, longDescription } = req.body;
    
    // Process objectives (convert from JSON string if needed)
    let objectives = req.body.objectives;
    if (typeof objectives === 'string') {
      objectives = JSON.parse(objectives);
    }
    
    // Process activities (convert from JSON string if needed)
    let activities = req.body.activities;
    if (typeof activities === 'string') {
      activities = JSON.parse(activities);
    }
    
    // Handle file uploads and delete old files if new ones uploaded
    const { image, galleryImages } = processUploadedFiles(req);
    
    // If new main image uploaded, delete the old one
    if (image && project.image !== '/placeholder.svg?height=400&width=800') {
      deleteFile(project.image);
    }
    
    // If new gallery images uploaded, delete old ones
    if (galleryImages.length > 0) {
      project.gallery.forEach(img => {
        if (!img.includes('placeholder.svg')) {
          deleteFile(img);
        }
      });
    }
    
    // Build update object
    const updateData = {
      title: title || project.title,
      duration: duration || project.duration,
      location: location || project.location,
      category: category || project.category,
      status: status || project.status,
      longDescription: longDescription || project.longDescription,
      objectives: objectives || project.objectives,
      activities: activities || project.activities
    };
    
    // Add image if uploaded
    if (image) {
      updateData.image = image;
    }
    
    // Add gallery images if uploaded
    if (galleryImages.length > 0) {
      updateData.gallery = galleryImages;
    }
    
    // Update the project
    project = await Project.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: project
    });
    
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }
    
    // Delete images from server
    if (project.image && !project.image.includes('placeholder.svg')) {
      deleteFile(project.image);
    }
    
    project.gallery.forEach(img => {
      if (!img.includes('placeholder.svg')) {
        deleteFile(img);
      }
    });
    
    await Project.findByIdAndRemove(req.params.id);
    
    res.status(200).json({
      success: true,
      data: {}
    });
    
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};
    
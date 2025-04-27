const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required']
  },
  duration: {
    type: String,
    required: [true, 'Project duration is required']
  },
  location: {
    type: String,
    required: [true, 'Project location is required']
  },
  category: {
    type: String,
    required: [true, 'Project category is required']
  },
  status: {
    type: String,
    required: [true, 'Project status is required'],
    enum: ['Ongoing', 'Completed', 'Planned']
  },
  image: {
    type: String,
    default: '/placeholder.svg?height=400&width=800'
  },
  longDescription: {
    type: String,
    required: [true, 'Project description is required']
  },
  objectives: {
    type: [String],
    required: [true, 'Project objectives are required']
  },
  activities: [
    {
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      }
    }
  ],
  gallery: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the timestamp when document is updated
projectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
const mongoose = require('mongoose');

// Define the schema for a Scholarship
const ScholarshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,  // Title is required
  },
  country: {
    type: String,
    required: true,  // Country is required
  },
  level: {
    type: String,
    required: true,  // Level of education (e.g., Undergraduate, Master's, PhD)
  },
  courses: {
    type: String,
    required: true,  // Courses covered by the scholarship
  },
  benefits: {
    type: String,
    required: true,  // Benefits provided (e.g., Tuition, Living expenses)
  },
  deadline: {
    type: String,
    required: true,  // Deadline for the scholarship application
  },
  imageUrl: {
    type: String,
    required: false,  // URL of the scholarship image
  },
  link: {
    type: String,
    required: true,  // URL to the scholarship detail page
  }
}, {
  timestamps: true,  // Automatically add createdAt and updatedAt fields
});

// Create a model based on the schema
const Scholarship = mongoose.model('Scholarship', ScholarshipSchema);

module.exports = Scholarship;

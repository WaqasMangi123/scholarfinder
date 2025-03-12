// models/phdScholarship.js

const mongoose = require('mongoose');

const PhdScholarshipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: 'No Description'
  },
  country: {
    type: String,
    default: 'Not specified'
  },
  educationLevel: {
    type: String,
    default: 'Not specified'
  },
  applyBy: {
    type: String,
    default: 'No Deadline'
  },
  link: {
    type: String,
    required: true,
    unique: true // Ensures no duplicates based on the link
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.model('PhdScholarship', PhdScholarshipSchema);

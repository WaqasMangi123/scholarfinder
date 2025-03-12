const mongoose = require('mongoose');

// Define the scholarship schema
const ScholarshipSchema = new mongoose.Schema({
  name: String,            // Name of the scholarship
  grantAmount: String,     // Scholarship grant amount
  deadline: String,        // Deadline for application
  provider: String,        // Scholarship provider
  location: String,        // Location of the provider
  link: String,            // Link to the scholarship details
});

// Create the model
const Scholarship = mongoose.model('Scholarship', ScholarshipSchema);

module.exports = Scholarship;

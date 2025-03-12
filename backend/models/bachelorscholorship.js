// models/bachelorscholorship.js

const mongoose = require('mongoose');

const BachelorScholarshipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  funding: { type: String, default: 'No Funding Info' },
  university: { type: String, default: 'No University Info' },
  educationLevel: { type: String, default: 'No Education Level' },
  subject: { type: String, default: 'All Subjects' },
  studentType: { type: String, default: 'Not specified' },
  country: { type: String, default: 'Not specified' },
  deadline: { type: String, default: 'No Deadline' },
  link: { type: String, required: true, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('BachelorScholarship', BachelorScholarshipSchema);

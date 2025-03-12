const mongoose = require('mongoose');

const UserDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  profile: {
    fullName: String,
    address: String,
    email: String,
    phoneNumber: String,
    objective: String,
    profileImage: String,
  },
  education: [{
    degreeLevel: String,
    course: String,
    school: String,
    grade: String,
    year: Date,
  }],
  certificates: [{
    name: String,
    issuingOrganization: String,
    date: Date,
  }],
  awards: [{
    title: String,
    description: String,
  }],
  experience: [{
    company: String,
    title: String,
    startDate: Date,
    endDate: Date,
    details: String,
  }],
  skills: [String],
  interests: [String],
  projects: [{
    title: String,
    description: String,
  }],
});

module.exports = mongoose.model('UserData', UserDataSchema);

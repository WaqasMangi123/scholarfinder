// models/FormData.js
const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    profileData: {
        name: String,
        address: String,
        email: String,
        phone: String,
        objective: String,
        profilePicture: String,
    },
    educationData: [{
        course: String,
        school: String,
        grade: String,
        year: Date,
    }],
    experienceData: [{
        company: String,
        title: String,
        startDate: Date,
        endDate: Date,
        details: String,
    }],
    skillsData: [String],
    interestsData: [String],
    projectsData: [{
        title: String,
        description: String,
    }]
});

module.exports = mongoose.model('FormData', formDataSchema);

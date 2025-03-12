const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Project schema
const ProjectSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
});

// Define the Experience schema
const ExperienceSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    experiences: [
        {
            companyName: { type: String, required: true },
            jobTitle: { type: String, required: true },
            startDate: { type: Date, required: true },
            endDate: { type: Date, required: true },
            details: { type: String },
            skills: [{ type: String }], // Array to store multiple skills
            areaOfInterest: { type: String }, // Area of interest for the experience
            projects: [ProjectSchema], // Embedded projects related to the experience
        },
    ],
});

module.exports = mongoose.model('Experience', ExperienceSchema);

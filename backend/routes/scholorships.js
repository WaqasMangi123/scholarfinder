const express = require('express');
const router = express.Router();
const Scholarship = require('../models/scholorships'); // Ensure the path is correct

// Add a scholarship (optional, if you want to manually add)
router.post('/scholarships', (req, res) => {
    const scholarship = new Scholarship(req.body);
    scholarship.save()
        .then(() => res.status(201).send('Scholarship added'))
        .catch(err => res.status(400).json(err));
});

// Get scholarship recommendations
router.get('/scholarships/recommendations', async (req, res) => {
    const userProfile = req.body; // Assume the profile data is sent in the request body
    const scholarships = await Scholarship.find({});
    const recommendations = scholarships.filter(scholarship => {
        return userProfile.interests.includes(scholarship.fieldOfStudy) &&
               userProfile.educationLevel === scholarship.educationLevel;
    });
    res.json(recommendations);
});

module.exports = router;

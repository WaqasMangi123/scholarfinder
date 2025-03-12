const express = require('express');
const Scholarship = require('../models/popularscholorships'); // Adjust the path based on your directory structure
const router = express.Router();

// Route to get all scholarships
router.get('/', async (req, res) => {  // Changed '/scholarships' to '/'
    try {
        const scholarships = await Scholarship.find(); // Fetch all scholarships
        res.status(200).json(scholarships); // Return the scholarships as a JSON response
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch scholarships' });
    }
});

module.exports = router;

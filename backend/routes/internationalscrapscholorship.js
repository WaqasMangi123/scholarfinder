// routes/phdScholarshipRoutes.js

const express = require('express');
const router = express.Router();
const PhdScholarship = require('../models/internationalscrapscholorships'); // Adjust the path as necessary

// Route to get all PhD scholarships
router.get('/', async (req, res) => {
  try {
    const scholarships = await PhdScholarship.find();
    res.status(200).json(scholarships);
  } catch (error) {
    console.error("Error fetching scholarships:", error);
    res.status(500).json({ error: "Server error while fetching scholarships" });
  }
});

// Route to get a single PhD scholarship by ID
router.get('/:id', async (req, res) => {
  try {
    const scholarship = await PhdScholarship.findById(req.params.id);
    if (!scholarship) {
      return res.status(404).json({ error: "Scholarship not found" });
    }
    res.status(200).json(scholarship);
  } catch (error) {
    console.error("Error fetching scholarship:", error);
    res.status(500).json({ error: "Server error while fetching scholarship" });
  }
});

module.exports = router;

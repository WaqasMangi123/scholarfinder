const express = require('express');
const router = express.Router();
const UserData = require('../models/userdata'); // Adjust this path if needed
const reqAuth = require('../middleware/reqAuth');

// Save or update education data
router.post('/', reqAuth, async (req, res) => {  // Route is '/' because '/api/education' is the base in index.js
  const { educations, certificates, awards, degreeLevel } = req.body;

  try {
    const userId = req.user._id; // Get user ID from authentication middleware

    // Format education data to include degree level if needed
    const educationData = educations.map((edu) => ({ ...edu, degreeLevel }));

    // Update or insert education data for the user
    await UserData.findOneAndUpdate(
      { userId },
      { $set: { education: educationData, certificates, awards } },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: 'Education data saved successfully' });
  } catch (error) {
    console.error('Error saving education data:', error);
    res.status(500).json({ error: 'Error saving education data' });
  }
});

module.exports = router;

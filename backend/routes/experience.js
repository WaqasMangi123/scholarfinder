const express = require('express');
const router = express.Router();
const UserData = require('../models/userdata');
const reqAuth = require('../middleware/reqAuth');

// Save or update experience data
router.post('/', reqAuth, async (req, res) => {  // Changed from '/experience' to '/'
  const { experienceData, skills, interests, projects } = req.body;

  try {
    const userId = req.user._id;

    // Update or insert experience data for the user
    await UserData.findOneAndUpdate(
      { userId },
      { $set: { experience: experienceData, skills, interests, projects } },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: 'Experience data saved successfully' });
  } catch (error) {
    console.error('Error saving experience data:', error);
    res.status(500).json({ error: 'Error saving experience data' });
  }
});

module.exports = router;

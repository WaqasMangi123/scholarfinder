const express = require('express');
const router = express.Router();
const UserData = require('../models/userdata');
const reqAuth = require('../middleware/reqAuth');

// Save or update profile data
router.post('/', reqAuth, async (req, res) => {  // Changed from '/profile' to '/'
  const { fullName, address, email, phoneNumber, objective, profileImage } = req.body;

  try {
    const userId = req.user._id; // Use user ID from authentication middleware
    const profileData = { fullName, address, email, phoneNumber, objective, profileImage };

    // Update or insert profile data
    await UserData.findOneAndUpdate(
      { userId },
      { $set: { profile: profileData } },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: 'Profile data saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving profile data' });
  }
});

module.exports = router;

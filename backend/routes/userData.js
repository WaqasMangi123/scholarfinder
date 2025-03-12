const express = require('express');
const UserData = require('../models/userdata'); // Adjust the path if needed
const router = express.Router();

// Save User Data
router.post('/', async (req, res) => {
    const {
        userId,  // This should come from the authenticated user
        profile,
        education,
        experience
    } = req.body;

    try {
        // Create a new document in the UserData collection
        const userData = await UserData.create({ userId, profile, education, experience });
        res.status(201).json(userData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;

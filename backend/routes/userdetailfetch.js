const express = require('express');
const UserData = require('../models/userdata'); // Import the UserData model
const router = express.Router();

// Route to fetch all user data details
router.get('/', async (req, res) => {
    try {
        // Fetch all user data from the database
        const usersData = await UserData.find();

        if (!usersData || usersData.length === 0) {
            return res.status(404).json({ message: 'No user data found' });
        }

        // Send the user data as the response
        res.status(200).json(usersData);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Error fetching user data' });
    }
});

module.exports = router;

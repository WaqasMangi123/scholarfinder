const express = require('express');
const router = express.Router();
const UserData = require('../models/userdata'); // Ensure this path is correct

// GET route to fetch all user data
router.get('/all', async (req, res) => {
    try {
        const allUsers = await UserData.find({});
        res.json(allUsers);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching user data' });
    }
});

module.exports = router;

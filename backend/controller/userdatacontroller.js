const UserData = require('../models/userdata');

exports.getAllUserDetails = async (req, res) => {
    try {
        const userDetails = await UserData.find(); // Fetch all users from the UserData collection
        res.status(200).json(userDetails);
    } catch (error) {
        res.status(500).json({ error: 'Server error. Could not fetch user details.' });
    }
};

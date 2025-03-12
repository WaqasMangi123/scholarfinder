const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Function to create a JWT token
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '5d' });
};

// Signup function
const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.signup(name, email, password);
        const userName = user.name;
        const token = createToken(user._id);
        
        // Include _id in the response
        res.status(200).json({ _id: user._id, userName, email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login function
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const userName = user.name;
        const token = createToken(user._id);
        
        // Include _id in the response
        res.status(200).json({ _id: user._id, userName, email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    signup,
    login,
};

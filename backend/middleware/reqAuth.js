const jwt = require('jsonwebtoken');
const User = require('../models/user');

const reqAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    // Check if authorization header is provided
    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token missing' });
    }

    const token = authorization.split(' ')[1]; // Extract token from "Bearer <token>"

    try {
        // Verify the token and extract the user ID
        const { _id } = jwt.verify(token, process.env.SECRET);
        
        // Find the user in the database by ID and attach it to the request object
        req.user = await User.findOne({ _id }).select('_id');
        
        if (!req.user) {
            return res.status(401).json({ error: 'User not found' });
        }

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Authorization error:", error.message);
        res.status(401).json({ error: 'Request is not authorized' });
    }
};

module.exports = reqAuth;

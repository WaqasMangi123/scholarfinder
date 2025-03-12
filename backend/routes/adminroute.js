// Import dependencies
const express = require('express');
const router = express.Router();

// Admin Login Route
router.post('/login', (req, res) => {
    const { secretKey } = req.body;

    // Check if the provided key matches the one in .env
    if (secretKey === process.env.SECRET) {
        return res.status(200).json({ message: 'Admin access granted', isAdmin: true });
    } else {
        return res.status(401).json({ message: 'Unauthorized', isAdmin: false });
    }
});

module.exports = router;

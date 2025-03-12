const express = require('express');
const router = express.Router();
const { getRecommendations } = require('../controller/recommendationcontroller'); // Import the controller

// Define the POST route for recommendations
router.post('/', getRecommendations); // Only "/" here, because it's prefixed with "/api/recommendation" in the main server

module.exports = router;

// In your routes file (e.g., systemInfoRoutes.js)
const express = require('express');
const { getSystemMetrics } = require('../controller/systemcontroller');

const router = express.Router();

router.get('/api/system-info', getSystemMetrics);

module.exports = router;

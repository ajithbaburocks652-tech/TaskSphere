const express = require('express');
const { getDashboardStats, getUsers } = require('../controllers/dashboardController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/stats', protect, getDashboardStats);
router.get('/users', protect, admin, getUsers);

module.exports = router;

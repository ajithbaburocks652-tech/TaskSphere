const express = require('express');
const { createTask, getTasks, updateTaskStatus } = require('../controllers/taskController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
    .get(protect, getTasks)
    .post(protect, admin, createTask);

router.route('/:id/status')
    .put(protect, updateTaskStatus);

module.exports = router;

const express = require('express');
const { createProject, getProjects, getProjectById } = require('../controllers/projectController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
    .get(protect, getProjects)
    .post(protect, admin, createProject);

router.route('/:id')
    .get(protect, getProjectById);

module.exports = router;

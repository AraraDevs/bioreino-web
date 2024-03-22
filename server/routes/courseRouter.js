const express = require('express');
const router = express.Router();

const CourseController = require('../controllers/CourseController');

// middlewares
const verifyToken = require('../helpers/verify-token');

router.post('/create', verifyToken, CourseController.create);

router.get('/', CourseController.courses);

module.exports = router;

const express = require('express');
const router = express.Router();

const CourseController = require('../controllers/CourseController');

// middlewares
const verifyToken = require('../helpers/verify-token');

router.post('/create', verifyToken, CourseController.create);

router.get('/', CourseController.allCourses);
router.get('/all/:limit', CourseController.allCourses);

module.exports = router;

const express = require('express');
const router = express.Router();

const CourseController = require('../controllers/CourseController');

// middlewares
const verifyToken = require('../helpers/verify-token');

router.post('/create', verifyToken, CourseController.create);

router.get('/filter/:plan', CourseController.getCoursesFiltered);
router.get('/all/:limit', CourseController.allCourses);
router.get('/:title', CourseController.getCourse);

module.exports = router;

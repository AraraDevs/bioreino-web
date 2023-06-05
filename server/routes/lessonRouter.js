const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

router.get('/:courseTitle', lessonController.allLessonsFromTheCourse);

module.exports = router;

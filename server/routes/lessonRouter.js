const express = require('express');
const router = express.Router();

const LessonController = require('../controllers/LessonController');

// middlewares
const verifyToken = require('../helpers/verify-token');

router.post('/create', verifyToken, LessonController.create);

module.exports = router.use('/lesson', router);

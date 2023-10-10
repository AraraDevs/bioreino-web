const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

// middlewares
const verifyToken = require('../helpers/verify-token');

router.post('/login', UserController.login);
router.post('/register', UserController.register);

router.get('/token/validate', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Token válido!' });
});
router.get('/', UserController.getUserData);

router.patch('/lastcourse', verifyToken, UserController.updateLastCourse);
router.patch(
  '/coursesprogress',
  verifyToken,
  UserController.updateCoursesProgress,
);

module.exports = router;

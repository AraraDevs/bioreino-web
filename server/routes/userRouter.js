const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

// middlewares
const verifyToken = require('../helpers/verify-token');

router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.post('/temporary_account', UserController.createTemporaryAccount);
router.post('/forgot_password', UserController.forgotPassword);
router.post('/reset_password', UserController.resetPassword);

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
router.patch('/edit/:id', verifyToken, UserController.editUser);

module.exports = router.use('/user', router);

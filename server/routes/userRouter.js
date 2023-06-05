const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.post('/login', userController.login);
router.post('/register', userController.register);

router.get('/', authController, (req, res) => {
  const user = req.user;
  res.status(200).json(user);
});
router.get('/token/validate', authController, (req, res) => {
  res.status(200).json({ msg: 'Token válido!' });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.post('/login', express.json(), userController.login);
router.post('/register', express.json(), userController.register);

router.get('/', express.json(), authController, (req, res) => {
  const user = req.user;
  res.status(200).json(user);
});

module.exports = router;

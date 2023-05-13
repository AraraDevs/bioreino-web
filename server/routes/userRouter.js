const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/login', express.json(), userController.login);
router.post('/register', express.json(), userController.register);

module.exports = router;

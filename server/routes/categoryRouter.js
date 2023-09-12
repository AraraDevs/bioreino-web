const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

// middlewares
const verifyToken = require('../helpers/verify-token');

router.get('/', verifyToken, CategoryController.getCategories);

module.exports = router;

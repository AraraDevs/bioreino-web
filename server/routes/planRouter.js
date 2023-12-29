const express = require('express');
const router = express.Router();

const PlanController = require('../controllers/PlanController');

router.get('/', PlanController.getPlans);

module.exports = router;

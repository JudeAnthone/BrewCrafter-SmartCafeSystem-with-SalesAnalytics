const express = require('express');
const router = express.Router();
const customDrinkController = require('../controllers/custom-drink-controller');

// POST /api/custom-drinks - Save a custom drink
router.post('/', customDrinkController.saveCustomDrink);

module.exports = router;
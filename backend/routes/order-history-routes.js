const express = require('express');
const router = express.Router();
const orderHistoryController = require('../controllers/order-history-controller');

router.get('/', orderHistoryController.getUserOrderHistory);

module.exports = router;
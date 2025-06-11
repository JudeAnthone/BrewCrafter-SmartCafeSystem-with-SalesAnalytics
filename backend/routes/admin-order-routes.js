const express = require('express');
const router = express.Router();
const adminOrderController = require('../controllers/admin-order-controller');

router.get('/orders', adminOrderController.getAllOrders);

module.exports = router;
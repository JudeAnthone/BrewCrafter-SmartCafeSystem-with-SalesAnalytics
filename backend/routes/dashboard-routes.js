const express = require('express');
const router = express.Router();
const dashboard = require('../controllers/dashboard-controller');

router.get('/today-sales', dashboard.getTodaySales);
router.get('/orders-summary', dashboard.getOrdersSummary);
router.get('/custom-drinks', dashboard.getCustomDrinksCount);
router.get('/inventory-status', dashboard.getInventoryStatus);
router.get('/sales-chart', dashboard.getSalesChart);
router.get('/recent-orders', dashboard.getRecentOrders);
router.get('/popular-items', dashboard.getPopularItems);

module.exports = router;
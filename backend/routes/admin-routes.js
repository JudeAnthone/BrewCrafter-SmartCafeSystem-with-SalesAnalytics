const express = require('express');
const router = express.Router();
const adminOnly = require('../middlewares/admin-middleware');
const authController = require('../controllers/auth-controller');

router.get('/profile', adminOnly, authController.getAdminProfile);
router.put('/profile', adminOnly, authController.updateAdminProfile);
router.put('/change-password', adminOnly, authController.changeAdminPassword);

module.exports = router;
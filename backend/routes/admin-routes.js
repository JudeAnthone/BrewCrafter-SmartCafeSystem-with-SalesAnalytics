// for testing
const express = require('express');
const router = express.Router();
const adminOnly = require('../middlewares/admin-middleware');

router.get('/dashboard', adminOnly, (req, res) => {
  res.json({ message: 'Welcome, Admin!', user: req.user });
});

module.exports = router;
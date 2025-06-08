// API ROUTES - connector ot API
const express = require ('express');
const router  = express.Router();
const { register, verifyOTP, login } = require('../controllers/auth-controller');
const passport = require('../config/facebook-auth');

router.post('/register', register);
router.post('/verify', verifyOTP);
router.post('/login', login);

// FB login router
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { session: false, failureRedirect: 'http://localhost:5173/login' }),
  (req, res) => {
    // Redirect to frontend with token
    res.redirect(`http://localhost:5173/social-login-success?token=${req.user.token}`);
  }
);

module.exports = router;
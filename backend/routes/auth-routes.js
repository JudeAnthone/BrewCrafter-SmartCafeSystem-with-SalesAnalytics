// API ROUTES - connector ot API
const express = require ('express');
const router  = express.Router();
const authController = require('../controllers/auth-controller');
const passport = require('../config/facebook-auth');

router.post('/register', authController.register);
router.post('/verify', authController.verifyOTP);
router.post('/login', authController.login);
router.post('/admin-register', authController.adminRegister);

// Step-up endpoints
router.post('/stepup-birthday', authController.verifyBirthdayStepUp);
router.post('/stepup-otp', authController.verifyStepUpOTP);

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
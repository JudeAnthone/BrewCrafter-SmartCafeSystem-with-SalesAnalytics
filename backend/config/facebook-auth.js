const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const pool = require('./db-connection');
const jwt = require('jsonwebtoken');

passport.use(new FacebookStrategy({
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/api/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'emails']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
        //check if the user exist
      const email = profile.emails[0].value;
      let user = await pool.query('SELECT * FROM brewcrafter.users WHERE user_email = $1', [email]);
     
      if(user.rows.length === 0){  
        user = await pool.query(
          `INSERT INTO brewcrafter.users (role_id, user_name, user_email, user_password, is_verified)
           VALUES ($1, $2, $3, $4, $5) RETURNING *`,
          [2, profile.displayName, email, 'facebook', true]  
        );
      }
      
      // create JWT token
      const token = jwt.sign(
        { id: user.rows[0].id, email: user.rows[0].user_email, role: user.rows[0].role_id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      return done(null, { ...user.rows[0], token });
      
    } catch (err) {
      return done(err, null);
    }
  }
));

module.exports = passport;
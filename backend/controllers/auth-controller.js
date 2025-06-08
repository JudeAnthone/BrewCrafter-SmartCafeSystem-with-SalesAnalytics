
// Imports and Setup
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const pool = require('../config/db-connection');

// Email sender 
// sets up gmail transporter using credentials in .env file
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD // app pass in used gmail
    }
});


// FUNCTION - OTP generator
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();  
};


// FUNCTION - Send email verification to users email address
const sendVerificationEmail = async (userEmail, otp) => {
  try {
    await transporter.sendMail({
        from: `"BrewCrafter" <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: "Verify Your BrewCrafter Account!",
        html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #5d4037;">Welcome to BrewCrafter!</h2>
    <p>Thank you for registering. To complete your registration, please use the verification code below:</p>
    <div style="background-color: #f5f5f5; padding: 15px; text-align: center; margin: 20px 0;">
      <h1 style="color: #5d4037; letter-spacing: 5px;">${otp}</h1>
    </div>
    <p>This code will expire in 10 minutes.</p>
    <p>If you didn't request this verification, please ignore this email.</p>
    <hr>
    <p style="font-size: 12px; color: #666;">
      This is an automated message, please do not reply.
    </p>
  </div>`
    }); 
    return true;
  } catch (error) {
    console.log('Email Sending failed:', error);
    return false;
  }  
};


// Register new user
exports.register = async (req, res) => {
    try {
        const { user_name, user_email, user_password, user_phone, user_address } = req.body;

        // Check if user exists
        const userExists = await pool.query(
            'SELECT * FROM brewcrafter.users WHERE user_email = $1',
            [user_email]
        );
        //if existing user
        if (userExists.rows.length > 0) {
            return res.status(400).json({
                message: 'Email already registered'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(user_password, 10);

        // Generate OTP
        const verificationToken = generateOTP();

        // Send email before saving to database
        const emailSent = await sendVerificationEmail(user_email, verificationToken);
        //if not sent
        if (!emailSent) {
            return res.status(500).json({
                message: 'Failed to send verification email'
            });
        }

        // Insert new user
        const result = await pool.query(
            `INSERT INTO brewcrafter.users (
                role_id,
                user_name,
                user_email,
                user_password,
                user_phone,
                user_address,
                verification_token,
                is_verified
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [
                2, // role_id 2 for customer
                user_name,
                user_email,
                hashedPassword,
                user_phone,
                user_address,
                verificationToken,
                false // set as false because not yet verified
            ]
        );
        // message if succesfull
        res.status(201).json({
            message: 'Registration successful. Please check your email for verification code.',
            user: {
                id: result.rows[0].id,
                email: result.rows[0].user_email
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            message: 'Registration failed',
            error: error.message
        });
    }
};


// OTP verification in email
exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        
        //comparing the saved otp to the database
        const result = await pool.query(
            'SELECT * FROM brewcrafter.users WHERE user_email = $1 AND verification_token = $2',
            [email, otp]
        );
        
        //if the user inputted wrong otp
        if (result.rows.length === 0) {
            return res.status(400).json({
                message: 'Invalid verification code'
            });
        }

        // Update user verification status if verified
        await pool.query(
            'UPDATE brewcrafter.users SET is_verified = true, verification_token = null WHERE user_email = $1',
            [email]
        );

        // Generate JWT token
        const token = jwt.sign(
            {
                id: result.rows[0].id,
                email: result.rows[0].user_email,
                role: result.rows[0].role_id
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        //message if verified
        res.json({
            message: 'Account verified successfully',
            token
        });

    } catch (error) {
        console.error('Verification error:', error);
        res.status(500).json({
            message: 'Verification failed',
            error: error.message
        });
    }
};


//Login 
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check if user exist
        const result = await pool.query(
            'SELECT * FROM brewcrafter.users WHERE user_email = $1', 
            [email]
        );
        
        // If invalid credentials
        if(result.rows.length === 0) {
            return res.status(201).json ({
                message: 'Please verify your account first'
            });
        }
        
        const user = result.rows[0];
        
        // Check if the user is verified
         if (!user.is_verified) {
            return res.status(401).json({
                message: 'Please verify your email first'
            });
        }
        
        // Check password
        const validPassword = await bcrypt.compare(password, user.user_password);
        
        // If invalid
        if(!validPassword){
            return res.status(401).json({
                message: 'Invalid Credential'
            });
        }  
        
        // Generate JWT token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.user_email,
                role: user.role_id
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        // Update last login
        await pool.query(
            'UPDATE brewcrafter.users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
            [user.id]
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.user_name,
                email: user.user_email,
                role: user.role_id
            }
        });
        
    } catch (error) {
         console.error('Login error:', error);
        res.status(500).json({
            message: 'Login failed',
            error: error.message
        });
    }
}; 
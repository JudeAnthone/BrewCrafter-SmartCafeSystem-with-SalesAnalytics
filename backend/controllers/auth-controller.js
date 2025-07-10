// Imports and Setup
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const pool = require('../config/db-connection');

// Email sender setup
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// OTP generator
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP email
const sendVerificationEmail = async (userEmail, otp) => {
  try {
    await transporter.sendMail({
        from: `"BrewCrafter" <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: "Your BrewCrafter OTP Code",
        html: `<div style="font-family:sans-serif; text-align:center;">
          <h2 style="color:#3e2723;">Your OTP Code</h2>
          <h1 style="font-size:2.5em; color:#cc6d2d; letter-spacing:4px;">${otp}</h1>
          <p style="color:#555;">This code will expire in 10 minutes.</p>
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
        const { user_name, user_email, user_password, user_phone, user_address, birthday } = req.body; // <-- Add birthday

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

        // Before inserting, always store birthday as YYYY-MM-DD string
        const birthdayStr = birthday ? birthday.slice(0, 10) : null;

        // Insert new user (add birthday)
        const result = await pool.query(
            `INSERT INTO brewcrafter.users (
                role_id,
                user_name,
                user_email,
                user_password,
                user_phone,
                user_address,
                birthday,
                verification_token,
                is_verified
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            [
                2, // role_id 2 for customer
                user_name,
                user_email,
                hashedPassword,
                user_phone,
                user_address,
                birthdayStr, 
                verificationToken,
                false // false because not yet verified
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
        const result = await pool.query(
            'SELECT * FROM brewcrafter.users WHERE user_email = $1',
            [email]
        );
        if(result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const user = result.rows[0];

        // Block login if not verified
        if (!user.is_verified) {
            return res.status(401).json({ message: 'Please verify your email before logging in.' });
        }

        // Step-up logic: for admins and users with birthday set
        if ((user.role_id === 1 || user.role_id === 'admin') && user.birthday) {
            if (user.is_locked && user.lock_until && new Date() < new Date(user.lock_until)) {
                return res.status(403).json({ message: `Account locked until ${user.lock_until}` });
            }
            const validPassword = await bcrypt.compare(password, user.user_password);
            if (!validPassword) {
                let failed = user.failed_login_attempts + 1;
                await pool.query(
                    "UPDATE brewcrafter.users SET failed_login_attempts = $1 WHERE id = $2",
                    [failed, user.id]
                );
                if (failed >= 5) {
                    return res.status(401).json({ stepUp: true, message: "Please enter your birthday to continue.", email });
                }
                return res.status(401).json({ message: "Invalid Credential" });
            }
            
            // On successful login, reset failed attempts
            await pool.query(
                "UPDATE brewcrafter.users SET failed_login_attempts = 0 WHERE id = $1",
                [user.id]
            );
            
        } else if (user.birthday) {
            // For regular users with birthday, keep existing logic
            const validPassword = await bcrypt.compare(password, user.user_password);
            if (!validPassword) {
                let failed = user.failed_login_attempts + 1;
                await pool.query(
                    "UPDATE brewcrafter.users SET failed_login_attempts = $1 WHERE id = $2",
                    [failed, user.id]
                );
                if (failed >= 5) {
                    return res.status(401).json({ stepUp: true, message: "Please enter your birthday to continue.", email });
                }
                return res.status(401).json({ message: "Invalid Credential" });
            }
            
            // On successful login, reset failed attempts
            await pool.query(
                "UPDATE brewcrafter.users SET failed_login_attempts = 0 WHERE id = $1",
                [user.id]
            );
            
        } else {
            // For old users (no birthday), OLD LOGIC
            const validPassword = await bcrypt.compare(password, user.user_password);
            if (!validPassword) {
                return res.status(401).json({ message: "Invalid Credential" });
            }
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

// Step-up: Birthday verification and send OTP
exports.verifyBirthdayStepUp = async (req, res) => {
    try {
        const { email, birthday } = req.body;
        const userRes = await pool.query('SELECT * FROM brewcrafter.users WHERE user_email = $1', [email]);
        const user = userRes.rows[0];

        const dbBirthday = String(user.birthday).slice(0, 10);

        if (!user || !user.birthday || String(birthday).slice(0, 10) !== dbBirthday) {
            const lockUntil = new Date(Date.now() + 1 * 60 * 1000); // 1 minute  
            await pool.query(
                'UPDATE brewcrafter.users SET is_locked = TRUE, lock_until = $1 WHERE id = $2',
                [lockUntil, user?.id]
            );
            return res.status(403).json({
                message: `Account locked for 1 minute due to incorrect birthday. Try again after ${lockUntil.toLocaleString()}.`
            });
        }

        // Use stepup_token for step-up OTP
        const otp = generateOTP();
        await pool.query('UPDATE brewcrafter.users SET stepup_token = $1 WHERE id = $2', [otp, user.id]);
        await sendVerificationEmail(email, otp);
        res.json({ message: "OTP sent to your email.", email });
    } catch (error) {
        res.status(500).json({ message: "Birthday step-up failed", error: error.message });
    }
};

// Step-up: OTP verification and unlock account
exports.verifyStepUpOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const userRes = await pool.query('SELECT * FROM brewcrafter.users WHERE user_email = $1', [email]);
        const user = userRes.rows[0];

        console.log("Submitted OTP:", otp);
        console.log("DB Step-Up OTP:", user.stepup_token);

        if (!user || user.stepup_token !== otp) {
            return res.status(401).json({ message: "Invalid OTP." });
        }
        // Reset failed attempts and unlock, clear stepup_token
        await pool.query('UPDATE brewcrafter.users SET failed_login_attempts = 0, is_locked = false, lock_until = null, stepup_token = null WHERE id = $1', [user.id]);
        const token = jwt.sign({ id: user.id, email: user.user_email, role: user.role_id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ message: "Step-up verification successful.", token, user: { id: user.id, email: user.user_email, role: user.role_id } });
    } catch (error) {
        res.status(500).json({ message: "OTP verification failed", error: error.message });
    }
};



// Admin registration
exports.adminRegister = async (req, res) => {
    try {
        const { admin_name, admin_email, admin_password, birthday } = req.body;

        // Check if admin exists
        const adminExists = await pool.query(
            'SELECT * FROM brewcrafter.users WHERE user_email = $1',
            [admin_email]
        );
        if (adminExists.rows.length > 0) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(admin_password, 10);

        // Generate OTP
        const verificationToken = generateOTP();

        // Send OTP email
        const emailSent = await sendVerificationEmail(admin_email, verificationToken);
        if (!emailSent) {
            return res.status(500).json({ message: 'Failed to send verification email' });
        }

        // Store birthday as string
        const birthdayStr = birthday ? birthday.slice(0, 10) : null;

        // Insert admin user (role_id = 1)
        const result = await pool.query(
            `INSERT INTO brewcrafter.users (
                role_id,
                user_name,
                user_email,
                user_password,
                birthday,
                verification_token,
                is_verified
            ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [
                1, // role_id 1 for admin
                admin_name,
                admin_email,
                hashedPassword,
                birthdayStr,
                verificationToken,
                false
            ]
        );

        res.status(201).json({
            message: 'Admin registration successful. Please check your email for verification code.',
            user: {
                id: result.rows[0].id,
                email: result.rows[0].user_email
            }
        });

    } catch (error) {
        console.error('Admin registration error:', error);
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};


/*-------------------------------------------------*/

// Get admin profile
exports.getAdminProfile = async (req, res) => {
    try {
        const adminId = req.user.id;
        const result = await pool.query(
            'SELECT user_name, user_email, birthday, user_phone FROM brewcrafter.users WHERE id = $1 AND role_id = 1',
            [adminId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch admin profile", error: error.message });
    }
};

// Update admin profile
exports.updateAdminProfile = async (req, res) => {
    try {
        const adminId = req.user.id;
        const { user_name, user_email, birthday, user_phone } = req.body;
        await pool.query(
            'UPDATE brewcrafter.users SET user_name = $1, user_email = $2, birthday = $3, user_phone = $4 WHERE id = $5 AND role_id = 1',
            [user_name, user_email, birthday, user_phone, adminId]
        );
        res.json({ message: "Profile updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to update profile", error: error.message });
    }
};

// Change admin password
exports.changeAdminPassword = async (req, res) => {
    try {
        const adminId = req.user.id;
        const { currentPassword, newPassword } = req.body;
        const result = await pool.query('SELECT user_password FROM brewcrafter.users WHERE id = $1', [adminId]);
        const user = result.rows[0];
        const valid = await bcrypt.compare(currentPassword, user.user_password);
        if (!valid) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }
        const hashed = await bcrypt.hash(newPassword, 10);
        await pool.query('UPDATE brewcrafter.users SET user_password = $1 WHERE id = $2', [hashed, adminId]);
        res.json({ message: "Password changed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to change password", error: error.message });
    }
};
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid'); // For cart ID generation
const User = require('../models/User'); // User model
const { env } = require('process');

const JWT_SECRET = 'your-secret-key'; // Replace with a secure key
const EMAIL_USER="kalrajanvi01@gmail.com";
const EMAIL_PASS="dtgnxpitafscpnwz";
// Email Signup
exports.signup = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).send('Email already registered');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ email, password: hashedPassword });

        res.redirect('/login.html');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Login

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate a cartId (can be a UUID or any unique value)
        const cartId = Math.random().toString(36).substring(2, 15); // Example cartId

        // Optionally, generate a JWT token (if required)
        const token = jwt.sign({ userId: user._id, cartId }, 'your-secure-secret', { expiresIn: '1h' });

        // Send back the cartId and token
        res.json({ cartId, token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ error: 'Email is required.' });
        }

        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(404).json({ error: 'Email not found.' });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        const expiry = new Date(Date.now() + 3600000); // Token expires in 1 hour

        await User.updateResetToken(email, resetToken, expiry);

        const resetLink = `http://localhost:8080/admin/reset-password?token=${resetToken}`;
        
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: 'no-reply@fleecebag.com',
            to: email,
            subject: 'Password Reset',
            html: `<p>Hi Fleecebag User,<br/></br>We found that you have forgot your password. Now To Change the password, click <a href="${resetLink}">here</a>. <br/><b>The link will expire in 1 hour.</b></p>`,
        });

        return res.status(200).json({ message: 'Reset link sent to email.' });
    } catch (error) {
        console.error('Forgot Password Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Reset Password
exports.resetPassword = async (req, res) => {
    console.log('req resetpass', req)
    const { token, newPassword } = req.body;

    try {
        if (!token || !newPassword) {
            return res.status(400).json({ error: 'Token and new password are required.' });
        }

        const user = await User.validateResetToken(token);
        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired reset token.' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash the new password
        await User.resetPassword(user.email, hashedPassword); // Pass email from user

        return res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error) {
        console.error('Reset Password Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Google Login Placeholder
exports.googleLogin = (req, res) => {
    // Google OAuth logic here
    res.send("Google login is under construction!");
};

// Facebook Login Placeholder
exports.facebookLogin = (req, res) => {
    // Facebook OAuth logic here
    res.send("Facebook login is under construction!");
};

// Controller to fetch all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll(); // Fetch all users
        res.status(200).json(users);    // Return users as JSON
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};
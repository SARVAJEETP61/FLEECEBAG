const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid'); // For cart ID generation
const User = require('../models/User'); // User model

const JWT_SECRET = 'your-secret-key'; // Replace with a secure key

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
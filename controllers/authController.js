const bcrypt = require('bcryptjs');
const User = require('../models/User'); // User model

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

        res.redirect('/index.html'); // Redirect after successful signup
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
            return res.status(400).send('Email and password are required');
        }

        // Use the correct method to find the user by email
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        }

        // Successful login, redirect to homepage
        res.redirect('/index.html');
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Internal Server Error');
    }
};
// Google and Facebook placeholders (OAuth)
exports.googleLogin = (req, res) => {
    // Google OAuth logic here
    res.send("Google login is under construction!");
};

exports.facebookLogin = (req, res) => {
    // Facebook OAuth logic here
    res.send("Facebook login is under construction!");
};

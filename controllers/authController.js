const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

class AuthController {
    static async signup(req, res) {
        try {
            const { email, password, name } = req.body;
            const existingUser = await User.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
            const newUser = { email, password, name };
            await User.create(newUser);
            return res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            console.error('Signup error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const isPasswordValid = await User.comparePassword(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            const token = jwt.sign(
                { userId: user._id, email: user.email },
                JWT_SECRET,
                { expiresIn: '1h' }
            );
            return res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            console.error('Login error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async logout(req, res) {
        try {
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                return res.status(400).json({ message: 'No token provided' });
            }
            await User.blacklistToken(token);
            return res.status(200).json({ message: 'Logout successful' });
        } catch (error) {
            console.error('Logout error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async googleLogin(req, res) {
        try {
            res.send('Google login functionality is not implemented');
        } catch (error) {
            console.error('Google login error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async facebookLogin(req, res) {
        try {
            res.send('Facebook login functionality is not implemented');
        } catch (error) {
            console.error('Facebook login error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = AuthController;

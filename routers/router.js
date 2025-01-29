const express = require('express');
const authController = require('../controllers/authController'); // Import the auth controller
const router = express.Router();
const path = require('path'); // Import path for serving static files

// Route for email signup
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

// Render the reset password page where the user can enter a new password
router.get('/reset-password', (req, res) => {
    const { token } = req.query;
    if (!token) {
        return res.status(400).json({ error: 'Token is missing.' });
    }
    
    res.sendFile(path.join(__dirname, '../public/reset-password.html'));
});
// Route for Google login
router.get('/auth/google', authController.googleLogin);

// Route for Facebook login
router.get('/auth/facebook', authController.facebookLogin);

// Route to fetch all users
router.get('/users', authController.getAllUsers);

// Export the router to be used in app.js
module.exports = router;
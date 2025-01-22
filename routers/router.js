// let express = require('express');
// let router = express.Router();



// module.exports = router;

const express = require('express');
const authController = require('../controllers/authController'); // Import the auth controller
const router = express.Router();

// Route for email signup
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Route for Google login
router.get('/auth/google', authController.googleLogin);

// Route for Facebook login
router.get('/auth/facebook', authController.facebookLogin);

// Export the router to be used in app.js
module.exports = router;

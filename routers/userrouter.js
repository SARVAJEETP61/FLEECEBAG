const express = require('express');
const authController = require('../controllers/authController'); // Import the auth controller
const router = express.Router();


router.post('/admin/signup', authController.signup);
router.post('/admin/login', authController.login);
router.post('/admin/logout', authController.logout);



router.get('/auth/google', authController.googleLogin);


router.get('/auth/facebook', authController.facebookLogin);


module.exports = router;

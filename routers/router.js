// router.js
let express = require('express');
let Offer = require('../controllers/offersController.js');

const router = express.Router();

// Define the endpoint to fetch offers
router.get('/offers', async (req, res) => {
    try {
        await Offer.getOtherItemDataApi(req, res); // Pass req and res to the controller function
    } catch (error) {
        console.error('Error fetching offers:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

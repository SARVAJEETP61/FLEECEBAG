let express = require('express');
let Offer = require('../controllers/offersController.js');

const router = express.Router();


router.get('/offers', async (req, res) => {
    try {
        await Offer.getOtherItemDataApi(req, res);
    } catch (error) {
        console.error('Error fetching offers:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
let cartController = require('../controllers/cartController');

const setCORSHeaders = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
};

router.get('/cart/:userId', setCORSHeaders, (req, res) => {
    cartController.getCartItemsApi(req, res);
});
router.delete('/cart/remove', setCORSHeaders, (req, res) => {
    cartController.deleteCartItemApi(req, res);
});
router.delete('/cart/removeAll/:userId', setCORSHeaders, (req, res) => {
    cartController.removeAllCartItems(req, res);
});

router.post('/cart/create/:userId', setCORSHeaders, (req, res) => {
    cartController.createCart(req, res);
});
router.put('/cart/update', setCORSHeaders, (req, res) => {
    // This route will update the quantity of the item
    const { userId, itemName, quantity } = req.body;
    cartController.updateCartItemApi(req, res, userId, itemName, quantity);
});


module.exports = router;

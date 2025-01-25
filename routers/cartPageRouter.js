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

module.exports = router;

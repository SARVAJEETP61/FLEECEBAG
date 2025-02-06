const express = require('express');
const router = express.Router();
let orderController = require('../controllers/orderController');

router.post('/order/add', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, application/json;charset=UTF-8');
    orderController.addOrderApi(req, res);
});

router.post('/orderlist', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, application/json;charset=UTF-8');
    orderController.getOrderListApi(req, res);
});

router.post('/order', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, application/json;charset=UTF-8');
    orderController.getOrderApi(req, res);
});


module.exports = router;
const express = require('express');
const router = express.Router();
// import * as controller from '../controllers/otherController.js';
let otherController = require('../controllers/otherController');
let cartController = require('../controllers/cartController');




router.get('/otheritem/new', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    otherController.getNewOtherItemListApi(req, res);
});

router.get('/otheritem/bestdeal', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    otherController.getBestSellOtherItemListApi(req, res);
});

router.get('/otheritem/schoolbag', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    otherController.getschoolBagListApi(req, res);
});

router.get('/otheritem/totebag', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    otherController.getToteBagListApi(req, res);
});

router.get('/otheritem/travelbag', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    otherController.getTeavelBagListApi(req, res);
});

module.exports = router; 

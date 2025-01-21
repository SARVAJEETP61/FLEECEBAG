let express = require('express');
let router = express.Router();
let controller = require('../controllers/menProducts');

router.get('/women/newProducts', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');  // '*' allows all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    controller.getNewWomenListApi(req, res);
});

router.get('/women/bestdeal', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');  // '*' allows all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    controller.getBestSellWomenListApi(req, res);
});

router.get('/women/handbag', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');  // '*' allows all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    controller.getHandbagListApi(req, res);
});

router.get('/women/slingbag', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');  // '*' allows all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    controller.getSlingBagListApi(req, res);
});

router.get('/women/clutches', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');  // '*' allows all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    controller.getClutchesListApi(req, res);
});

router.get('/women/messenger', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');  // '*' allows all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    controller.getMessengerListApi(req, res);
});

module.exports = router;
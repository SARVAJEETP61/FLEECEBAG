let express = require('express');
let router = express.Router();
let controller = require('../controllers/otherController');

router.get('/otheritem/new', function(req,res){
    res.setHeader('Access-Control-Allow-Origin', '*');  // '*' allows all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    controller.getNewOtherItemListApi(req,res);
});

router.get('/otheritem/bestdeal', function(req,res){
    res.setHeader('Access-Control-Allow-Origin', '*');  // '*' allows all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    controller.getBestSellOtherItemListApi(req,res);
});

router.get('/otheritem/schoolbag', function(req,res){
    res.setHeader('Access-Control-Allow-Origin', '*');  // '*' allows all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    controller.getschoolBagListApi(req,res);
});

router.get('/otheritem/totebag', function(req,res){
    res.setHeader('Access-Control-Allow-Origin', '*');  // '*' allows all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    controller.getToteBagListApi(req,res);
});

router.get('/otheritem/travelbag', function(req,res){
    res.setHeader('Access-Control-Allow-Origin', '*');  // '*' allows all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    controller.getTeavelBagListApi(req,res);
});

module.exports = router;


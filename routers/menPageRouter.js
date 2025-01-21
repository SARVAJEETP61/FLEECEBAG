let express = require('express');
let router = express.Router();
let controller = require('../controllers/menProducts');

router.get('/men/newProducts', function(req,res){
    res.setHeader('Access-Control-Allow-Origin', '*');  // '*' allows all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    controller.getNewMenListApi(req,res);
});

router.get('/men/bestdeal', function(req,res){
    res.setHeader('Access-Control-Allow-Origin', '*');  // '*' allows all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    controller.getBestSellMenListApi(req,res);
});

router.get('/men/laptopbag', function(req,res){
    res.setHeader('Access-Control-Allow-Origin', '*');  // '*' allows all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    controller.getLaptopBagListApi(req,res);
});

router.get('/men/slingbag', function(req,res){
    res.setHeader('Access-Control-Allow-Origin', '*');  // '*' allows all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    controller.getSlingBagListApi(req,res);
});

router.get('/men/wallet', function(req,res){
    res.setHeader('Access-Control-Allow-Origin', '*');  // '*' allows all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    controller.getWalletListApi(req,res);
});

module.exports = router;
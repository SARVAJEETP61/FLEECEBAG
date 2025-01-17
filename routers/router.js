let express = require('express');
let router = express.Router();
let controller = require('../controllers/otherController');

router.get('/otheritem/get', function(req,res){
    res.setHeader('Access-Control-Allow-Origin', '*');  // '*' allows all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    controller.getOtherItemDataApi(req,res);
});

module.exports = router;


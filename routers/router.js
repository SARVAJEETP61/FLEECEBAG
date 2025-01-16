let express = require('express');
let router = express.Router();
let controller = require('../controllers/otherController');

router.get('/otheritem/get', function(req,res){
    controller.getOtherItemDataApi(req,res);
});

module.exports = router;


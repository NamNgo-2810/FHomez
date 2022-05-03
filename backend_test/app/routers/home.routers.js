var express = require('express');
var router = express.Router();

var homeController = require('../controllers/home.controller')

router.get('/', function(req, res){
    res.send("Home page");
})

router.get('/api1', homeController.api1);


module.exports = router;
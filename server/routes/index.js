var express = require('express');
var router = express.Router();

var facebookController = require('../controllers/facebook')
var jwtController = require('../controllers/jwt')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/fb_login', facebookController.getData);
router.get('/jwt', jwtController.getData);


module.exports = router;

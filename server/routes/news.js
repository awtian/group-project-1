var express = require('express');
var router = express.Router();
var newsController = require('../controllers/news')
/* GET users listing. */
router.get('/headline', newsController.headline);
router.get('/search', newsController.search)
router.get('/interest', newsController.interest)


module.exports = router;

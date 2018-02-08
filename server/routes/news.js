const express = require('express');
const router = express.Router();
const newsController = require('../controllers/news')

router.get('/headline', newsController.headline);
router.get('/search', newsController.search)
router.get('/interest', newsController.interest)


module.exports = router;

const express = require('express');
const router = express.Router();
const musicController = require('../controllers/music')

router.get('/search', musicController.search_by)

module.exports = router;

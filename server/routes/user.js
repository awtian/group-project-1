var express = require('express');
var router = express.Router();
const userController = require('../controllers/user')

router.post('/', userController.create)
// router.get('/', userController.findAll)
router.get('/:email', userController.findOne)


module.exports = router;
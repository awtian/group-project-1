const express         = require('express');
const router          = express.Router();
const FB              = require('fb');
const fb              = new FB.Facebook({version: 'v2.11'});
const userController  = require('../controllers/user')
const setAccessToken  = (req, res, next) => {
  console.log('tess');
  FB.setAccessToken(req.headers.fbtoken);
  next()
}

router.post('/',  userController.getUser)
// router.get('/', userController.findAll)
router.get('/:email', userController.findOne)


module.exports = router;

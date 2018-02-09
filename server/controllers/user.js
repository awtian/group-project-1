const FB        = require('fb');
const fb        = new FB.Facebook({version: 'v2.11'});
const userModel = require('../models/user')

class UserController{

  static create(req, res) {
    // userModel.create({
    //   email: req.body.email,
    //   language: req.body.language,
    //   countryCode: req.body.countryCode,
    //   music: req.body.music
    // })
    //   .then(data => res.send(data))
    //   .catch(err => res.status(500).send(err))
  }

  static getUser(req, res) {

  }

  static findAll(req,res) {
    userModel.find({})
      .then(data => res.send(data))
      .catch(err => res.status(500).send(err))
  }

  static findOne(req, res) {
    userModel.findOne({email: req.params.email})
      .then(data => res.send(data) )
      .catch(err => res.status(500).send(err))
  }

}

module.exports = UserController;

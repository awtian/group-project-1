const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  fbid: String,
  email : String,
  name : String,
  location: String,
  language : String,
  countryCode: String,
  picture: String,
  music: [String]
})

userSchema.statics.findOneOrCreate = function findOneOrCreate(condition, datauser, callback) {
  const self = this
  self.findOne(condition, (err, result) => {
      return result 
      ? callback(err, result) 
      : self.create(datauser, (err, result) => { return callback(err, result) })
  })
}

module.exports = mongoose.model('User', userSchema);
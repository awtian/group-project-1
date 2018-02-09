const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  email : String,
  language : String,
  countryCode: String,
  music: [String]
})

userSchema.statics.findOneOrCreate = function findOneOrCreate(condition, datauser, callback) {
  const self = this
  console.log(condition)
  console.log(datauser)
  self.findOne(condition, (err, result) => {
      return result 
      ? callback(err, result) 
      : self.create(datauser, (err, result) => { return callback(err, result) })
  })
}

module.exports = mongoose.model('User', userSchema);
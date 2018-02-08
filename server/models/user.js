const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  email : String,
  language : String,
  countryCode: String,
  music: [String]
})

module.exports = mongoose.model('User', userSchema);
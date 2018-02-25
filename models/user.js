const mongoose = require('mongoose')

const User = mongoose.model('User', {
  username: String,
  name: String,
  passwordHash: String,
  of_age: Boolean,
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})

module.exports = User
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const user = new Schema({
  password:{
    type:String
  },
  email:{
    type:Number
  }
})
module.exports = mongoose.model('user', user)

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const product = new Schema({
  title:{
    type:String
  },
  img:{
    type: String
  },
  description:{
    type:String
  },
  price:{
    type:Number
  }
})
module.exports = mongoose.model('product', product)

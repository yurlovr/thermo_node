const mongoose = require('mongoose')
const connection = require('../libs/connection')

const schema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
})

module.exports = connection.model('Token', schema)

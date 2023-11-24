
const mongoose = require('mongoose');
const db = require('../dbFactory/primaryDB');


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = db.model('User', userSchema);

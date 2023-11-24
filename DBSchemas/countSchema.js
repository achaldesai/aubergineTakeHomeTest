
const mongoose = require('mongoose');
const db = require('../dbFactory/primaryDB');

const countSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true
  }
});

module.exports = db.model('Count', countSchema);

const mongoose = require('mongoose');
const connection = require('../db');

const categorySchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true,
  },
});

module.exports = connection.model('Category', categorySchema);

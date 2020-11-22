const mongoose = require('mongoose');
const connection = require('../db');
const OperationType = require('../constants/operationType');

const categorySchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: Object.values(OperationType),
    required: true,
  },
});

module.exports = connection.model('Category', categorySchema);

const mongoose = require('mongoose');
const connection = require('../db');
const OperationType = require('../constants/operationType');

const operationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: Object.values(OperationType),
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: 'Category',
  },
  wallet: {
    type: mongoose.Types.ObjectId,
    ref: 'Wallet',
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  }
});

module.exports = connection.model('Operation', operationSchema);

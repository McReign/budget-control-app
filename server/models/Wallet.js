const mongoose = require('mongoose');
const connection = require('../db');

const walletSchema = new mongoose.Schema({
  balance: {
    type: Number,
    default: 0,
  },
  isBalanceSet: {
    type: Boolean,
    default: false,
  },
  users: [{
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  }],
});

module.exports = connection.model('Wallet', walletSchema);

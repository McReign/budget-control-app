const mongoose = require('mongoose');
const connection = require('../db');

const invitationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  from: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  to: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  wallet: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Wallet',
  }
});

module.exports = connection.model('Invitation', invitationSchema);

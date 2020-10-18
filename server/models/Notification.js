const mongoose = require('mongoose');
const connection = require('../db');
const NotificationType = require('../constants/notificationType');

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: Object.keys(NotificationType),
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  from: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  to: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  payload: {
    type: mongoose.Mixed,
  }
});

module.exports = connection.model('Notification', notificationSchema);

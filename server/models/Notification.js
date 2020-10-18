const mongoose = require('mongoose');
const connection = require('../db');
const NotificationType = require('../constants/notificationType');
const NotificationModel = require('../constants/notificationModel');

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: Object.values(NotificationType),
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  to: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  content: {
    type: mongoose.Types.ObjectId,
    required: true,
    refPath: 'model',
  },
  model: {
    type: String,
    required: true,
    enum: Object.values(NotificationModel),
  },
});

module.exports = connection.model('Notification', notificationSchema);

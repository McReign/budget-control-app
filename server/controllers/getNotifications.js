const Notification = require('../models/Notification');
const mapNotification = require('../mappers/notification');
const mapResponse = require('../mappers/response');

module.exports = async function(ctx) {
    const notifications = await Notification.find({ to: ctx.user });
    ctx.body = mapResponse({ notifications: notifications.map(mapNotification) });
};
const Notification = require('../models/Notification');
const mapResponse = require('../mappers/response');

module.exports = async function(ctx) {
    const { notificationId } = ctx.params;

    const notifications = await Notification.find({ to: ctx.user });
    const notification = notifications.find(notification => notification.id === notificationId);

    if (!notification) {
        ctx.throw(403, 'Уведомление не принадлежит текущему пользователю');
    }

    await notification.remove();
    ctx.body = mapResponse({ success: true });
};
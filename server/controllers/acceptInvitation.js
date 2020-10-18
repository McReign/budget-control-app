const Wallet = require('../models/Wallet');
const Notification = require('../models/Notification');
const mapResponse = require('../mappers/response');
const NotificationType = require('../constants/notificationType');

module.exports = async function(ctx) {
    const { invitationId } = ctx.params;

    const notifications = await Notification.find({ to: ctx.user });
    const notification = notifications.find(notification => notification.id === invitationId);

    if (!notification) {
        ctx.throw(403, 'Уведомление не принадлежит текущему пользователю');
    }

    if (notification.type !== NotificationType.INVITATION) {
        ctx.throw(400, 'Уведомление не является приглашением');
    }

    const wallet = await Wallet.findById(notification.payload.wallet);
    wallet.users = [...wallet.users, notification.to];

    await Promise.all([notification.remove(), wallet.save()]);

    ctx.body = mapResponse({ success: true });
};
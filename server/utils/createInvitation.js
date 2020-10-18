const Notification = require('../models/Notification');
const Invitation = require('../models/Invitation');
const NotificationType = require('../constants/notificationType');
const NotificationModel = require('../constants/notificationModel');

module.exports = async function(wallet, to, from) {
    const title = `${from.displayName} (${from.email}) приглашает Вас в свой кошелек!`;

    const invitation = new Invitation({ title, wallet, from, to });
    await Notification.create({
        type: NotificationType.INVITATION,
        to,
        content: invitation,
        model: NotificationModel[NotificationType.INVITATION]
    });

    return invitation.save();
};
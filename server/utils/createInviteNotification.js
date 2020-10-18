const Notification = require('../models/Notification');
const NotificationType = require('../constants/notificationType');

module.exports = async function(wallet, toUser, fromUser) {
    const title = `${fromUser.displayName} (${fromUser.email}) приглашает Вас в свой кошелек!`;
    return await Notification.create({
        type: NotificationType.INVITATION,
        title,
        from: fromUser,
        to: toUser,
        payload: { wallet },
    });
};
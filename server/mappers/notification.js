const NotificationType = require('../constants/notificationType');
const mapInvitation = require('../mappers/invitation');

function mapNotificationContent(type, content) {
    switch (type) {
        case NotificationType.INVITATION:
            return mapInvitation(content);
        default:
            return null;
    }
}

module.exports = function mapNotification(notification) {
    return notification ? {
        id: notification.id,
        type: notification.type,
        content: mapNotificationContent(notification.type, notification.content),
        createdAt: notification.createdAt,
    } : null;
};
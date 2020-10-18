module.exports = function mapNotification(notification) {
    return notification ? {
        id: notification.id,
        type: notification.type,
        title: notification.title,
        description: notification.description,
        createdAt: notification.createdAt,
    } : null;
};
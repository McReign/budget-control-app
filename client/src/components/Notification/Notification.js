import React from 'react';
import { InvitationWithStore } from './types/Invitation/InvitationWithStore';
import { SimpleNotificationWithStore } from './types/SimpleNotification/SimpleNotificationWithStore';

export const NotificationType = {
    INVITATION: 'INVITATION',
    SIMPLE_NOTIFICATION: 'SIMPLE_NOTIFICATION',
};

export const Notification = ({ notification }) => {
    switch (notification?.type) {
        case NotificationType.INVITATION:
            return <InvitationWithStore notification={notification} />;
        case NotificationType.SIMPLE_NOTIFICATION:
            return <SimpleNotificationWithStore notification={notification} />;
    }
};

import '../../Notification.scss';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SimpleNotification } from './SimpleNotification';

export const SimpleNotificationWithStore = (props) => {
    const dispatch = useDispatch();

    const onClose = useCallback((notificationId) => {
        return Promise.resolve();
    }, []);

    return <SimpleNotification {...props} onClose={onClose} />
};

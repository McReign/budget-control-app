import React from 'react';
import { useSelector } from 'react-redux';

import { notificationsListSelector } from '../../store/modules/notifications/selectors';
import { NotificationsDrawer } from './NotificationsDrawer';

export const NotificationsDrawerWithStore = (props) => {
    const notifications = useSelector(notificationsListSelector);
    return <NotificationsDrawer {...props} notifications={notifications} />;
};

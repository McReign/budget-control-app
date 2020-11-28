import React from 'react';
import { useSelector } from 'react-redux';

import { notificationsSelector } from '../../store/modules/user/selectors';
import { NotificationsDrawer } from './NotificationsDrawer';

export const NotificationsDrawerWithStore = (props) => {
    const notifications = useSelector(notificationsSelector);
    return <NotificationsDrawer {...props} notifications={notifications} />;
};

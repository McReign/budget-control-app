import React from 'react';
import { Drawer, Empty } from 'antd';

import { Notification } from '../Notification/Notification';

export const NotificationsDrawer = ({ visible, notifications, onClose }) => {
    return (
        <Drawer
            title='Уведомления'
            placement='right'
            width={360}
            onClose={onClose}
            visible={visible}
        >
            {notifications && notifications.length ? (
                notifications.map(notification => (
                    <Notification key={notification.id} notification={notification} />
                ))
            ) : (
                <Empty description='Список пуст' />
            )}
        </Drawer>
    );
};

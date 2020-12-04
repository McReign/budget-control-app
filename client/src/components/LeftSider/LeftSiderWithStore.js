import './LeftSider.scss';
import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/modules/user/selectors';
import { notificationsListSelector } from '../../store/modules/notifications/selectors';
import { LeftSider } from './LeftSider';
import { walletsSelector } from '../../store/modules/wallets/selectors';

export const LeftSiderWithStore = (props) => {
    const notifications = useSelector(notificationsListSelector);
    const wallets = useSelector(walletsSelector);
    const user = useSelector(userSelector);

    return (
        <LeftSider
            {...props}
            notifications={notifications}
            wallets={[...wallets].reverse()}
            user={user}
        />
    );
};

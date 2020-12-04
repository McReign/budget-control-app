import './LeftSider.scss';
import React, { useCallback, useState } from 'react';
import { Switch, Route, NavLink } from "react-router-dom";
import { Avatar, Space, Badge } from 'antd';
import { QuestionOutlined, BellOutlined } from '@ant-design/icons';
import cn from 'classnames';

import { NotificationsDrawerWithStore } from '../NotificationsDrawer/NotificationsDrawerWithStore';
import { getFirstLetter } from '../../utils/getFirstLetter';
import { WalletMenu } from './menus/WalletMenu/WalletMenu';
import { UserMenu } from './menus/UserMenu/UserMenu';

export const LeftSider = ({ wallets, user, notifications, collapseSider }) => {
    const [isNotificationDrawerVisible, setNotificationDrawerVisible] = useState(false);

    const openNotificationsDrawer = useCallback(() => {
        setNotificationDrawerVisible(true);
    }, [setNotificationDrawerVisible]);

    const closeNotificationsDrawer = useCallback(() => {
        setNotificationDrawerVisible(false);
    }, [setNotificationDrawerVisible]);

    return (
        <div className='left-sider'>
            <NotificationsDrawerWithStore visible={isNotificationDrawerVisible} onClose={closeNotificationsDrawer} />
            <div className='left-sider__main-menu-wrapper'>
                <div className='left-sider__wallets'>
                    <Space className='left-sider__wallets-space' direction='vertical'>
                        {wallets.map(({ id }, index) => (
                            <NavLink key={id} to={`/wallets/${id}`}>
                                <Avatar
                                    className={cn('left-sider__wallet-avatar', 'left-sider__main-menu-item')}
                                    gap={4}
                                    size='large'
                                >
                                    {index + 1}
                                </Avatar>
                            </NavLink>
                        ))}
                    </Space>
                </div>
                <div className="left-sider__additional-info">
                    <Space direction='vertical' align='center'>
                        <NavLink to={'/help'}>
                            <Avatar
                                className={cn('left-sider__question-avatar', 'left-sider__main-menu-item')}
                                gap={4}
                                size='large'
                            >
                                <QuestionOutlined />
                            </Avatar>
                        </NavLink>
                        <Badge count={notifications?.length}>
                            <Avatar
                                className='left-sider__notifications-avatar'
                                gap={4}
                                size='large'
                                onClick={openNotificationsDrawer}
                            >
                                <BellOutlined />
                            </Avatar>
                        </Badge>
                        <NavLink to={'/user'}>
                            <Avatar
                                className={cn('left-sider__user-avatar', 'left-sider__main-menu-item')}
                                gap={4}
                                size='large'
                            >
                                {getFirstLetter(user?.displayName)}
                            </Avatar>
                        </NavLink>
                    </Space>
                </div>
            </div>
            <div className='left-sider__menu-wrapper'>
                <Switch>
                    <Route path='/wallets/:walletId/:tab?'>
                        <WalletMenu />
                    </Route>
                    <Route path='/user/:tab?'>
                        <UserMenu />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

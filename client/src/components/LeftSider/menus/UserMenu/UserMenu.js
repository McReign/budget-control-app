import { Menu } from 'antd';
import React, { useCallback } from 'react';
import { LogoutOutlined, ProfileOutlined } from '@ant-design/icons';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import { logoutUser } from '../../../../store/modules/user/thunks';
import { ERROR_MESSAGE_DURATION } from '../../../../constants/errors';

export const UserMenuKey = {
    PROFILE: 'profile',
    LOGOUT: 'logout',
};

const menuItems = [
    {
        key: UserMenuKey.PROFILE,
        icon: ProfileOutlined,
        name: 'Профиль',
        path: `/${UserMenuKey.PROFILE}`
    },
];

export const UserMenu = () => {
    const { tab } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = useCallback(() => {
        dispatch(logoutUser())
            .then(() => history.push('/login'))
            .catch(errors => message.error(errors?.common, ERROR_MESSAGE_DURATION));
    }, [dispatch]);

    return (
        <Menu
            theme="dark"
            selectedKeys={[tab]}
            mode="inline"
        >
            {menuItems.map(({ key, icon: Icon, name, path }) => (
                <Menu.Item key={key} icon={<Icon />}>
                    <Link to={`/user${path}`}>
                        {name}
                    </Link>
                </Menu.Item>
            ))}
            <Menu.Item
                key={UserMenuKey.LOGOUT}
                icon={<LogoutOutlined />}
                danger
                onClick={handleLogout}
            >
                Выйти
            </Menu.Item>
        </Menu>
    );
};

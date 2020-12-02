import { Menu } from 'antd';
import React, { useCallback } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import { LogoutOutlined, ProfileOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { logoutUser } from '../../../../store/modules/user/thunks';
import { handleErrors } from '../../../../utils/handleErrors';

export const UserMenuKey = {
    PROFILE: 'profile',
    CATEGORIES: 'categories',
    LOGOUT: 'logout',
};

const menuItems = [
    {
        key: UserMenuKey.PROFILE,
        icon: ProfileOutlined,
        name: 'Профиль',
        path: `/${UserMenuKey.PROFILE}`
    },
    {
        key: UserMenuKey.CATEGORIES,
        icon: UnorderedListOutlined,
        name: 'Категории',
        path: `/${UserMenuKey.CATEGORIES}`
    },
];

export const UserMenu = () => {
    const { tab } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = useCallback(() => {
        dispatch(logoutUser())
            .then(() => history.push('/login'))
            .catch(handleErrors(message));
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

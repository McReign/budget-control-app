import { Menu } from 'antd';
import React from 'react';
import { LogoutOutlined } from '@ant-design/icons';

export const UserMenuKey = {
    LOGOUT: 'LOGOUT',
};

const menuItems = [
    {
        key: UserMenuKey.LOGOUT,
        icon: LogoutOutlined,
        name: 'Выйти',
    },
];

export const UserMenu = () => {
    return (
        <Menu
            theme="dark"
            selectedKeys={[]}
            mode="inline"
        >
            {menuItems.map(({ key, icon: Icon, name }) => (
                <Menu.Item key={key} icon={<Icon />}>
                    {name}
                </Menu.Item>
            ))}
        </Menu>
    );
};

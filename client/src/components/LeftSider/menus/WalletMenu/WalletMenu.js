import { Menu } from 'antd';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    AlignLeftOutlined,
    DollarCircleOutlined,
    PieChartOutlined,
    UsergroupAddOutlined
} from '@ant-design/icons';

export const WalletMenuKey = {
    SUMMARY: 'summary',
    TRANSACTIONS: 'transactions',
    REPORTS: 'reports',
    USERS: 'users',
};

const menuItems = [
    {
        key: WalletMenuKey.SUMMARY,
        icon: AlignLeftOutlined,
        name: 'Сводка',
        path: `/${WalletMenuKey.SUMMARY}`
    },
    {
        key: WalletMenuKey.TRANSACTIONS,
        icon: DollarCircleOutlined,
        name: 'Транзакции',
        path: `/${WalletMenuKey.TRANSACTIONS}`
    },
    {
        key: WalletMenuKey.REPORTS,
        icon: PieChartOutlined,
        name: 'Отчеты',
        path: `/${WalletMenuKey.REPORTS}`
    },
    {
        key: WalletMenuKey.USERS,
        icon: UsergroupAddOutlined,
        name: 'Пользователи',
        path: `/${WalletMenuKey.USERS}`
    },
];

export const WalletMenu = () => {
    const { walletId, key } = useParams();
    return (
        <Menu
            theme="dark"
            selectedKeys={[key]}
            mode="inline"
        >
            {menuItems.map(({ key, icon: Icon, name, path }) => (
                <Menu.Item key={key} icon={<Icon />}>
                    <Link to={`/wallets/${walletId}${path}`}>
                        {name}
                    </Link>
                </Menu.Item>
            ))}
        </Menu>
    );
};

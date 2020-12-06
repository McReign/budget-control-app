import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

export const HelpMenu = () => {
    return (
        <Menu
            theme="dark"
            selectedKeys={['help']}
            mode="inline"
        >
            <Menu.Item key={'help'} icon={<QuestionCircleOutlined />}>
                <Link to={`/help`}>
                    Помощь
                </Link>
            </Menu.Item>
        </Menu>
    );
};

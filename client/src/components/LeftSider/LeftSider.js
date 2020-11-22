import './LeftSider.scss';
import React from 'react';
import { Menu, Avatar, Space } from 'antd';
import cn from 'classnames';

export const LeftSider = (props) => {
    const {
        menuItem,
        miniMenuItem,
        miniMenuItemId,
        miniMenuTopItems,
        miniMenuBottomItems,
        menuItems,
        onMenuSelect,
        onMiniMenuSelect,
    } = props;

    const isMiniMenuSelected = (key, id) => {
        return key === miniMenuItem && id === miniMenuItemId;
    };

    return (
        <div className='left-sider'>
            <div className='left-sider__mini-menu-wrapper'>
                <div className='left-sider__mini-menu_top'>
                    <Space direction='vertical'>
                        {miniMenuTopItems.map(({ key, id, name }) => (
                            <Avatar
                                key={`${key}_${id}`}
                                className={cn(
                                    'left-sider__mini-menu-item',
                                    'left-sider__mini-menu-item_cyan',
                                    { 'left-sider__mini-menu-item_selected': isMiniMenuSelected(key, id) },
                                )}
                                gap={4}
                                size='large'
                                onClick={() => onMiniMenuSelect(key, id)}
                            >
                                {name}
                            </Avatar>
                        ))}
                    </Space>
                </div>
                <div className="left-sider__mini-menu_bottom">
                    <Space direction='vertical' align='center'>
                        {miniMenuBottomItems.map(({ key, id, name }) => (
                            <Avatar
                                key={`${key}_${id}`}
                                className={cn(
                                    'left-sider__mini-menu-item',
                                    'left-sider__mini-menu-item_orange',
                                    { 'left-sider__mini-menu-item_selected': isMiniMenuSelected(key, id) },
                                )}
                                gap={4}
                                size='large'
                                onClick={() => onMiniMenuSelect(key, id)}
                            >
                                {name}
                            </Avatar>
                        ))}
                    </Space>
                </div>
            </div>
            <div className='left-sider__menu-wrapper'>
                <Menu
                    theme="dark"
                    selectedKeys={[menuItem]}
                    mode="inline"
                    onSelect={({ key }) => onMenuSelect(key)}
                >
                    {menuItems.map(({ key, icon: Icon, name }) => (
                        <Menu.Item key={key} icon={<Icon />}>
                            {name}
                        </Menu.Item>
                    ))}
                </Menu>
            </div>
        </div>
    );
};
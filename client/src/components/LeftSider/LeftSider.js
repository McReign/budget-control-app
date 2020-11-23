import './LeftSider.scss';
import React, { useState } from 'react';
import { Menu, Avatar, Space, Badge, Drawer, Card, Row, Col, Typography, Button, message, Empty, Tooltip } from 'antd';
import { QuestionOutlined, BellOutlined } from '@ant-design/icons';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { notificationsSelector } from '../../store/modules/user/selectors';
import { toDisplayDateTime } from '../../utils/toDisplayDateTime';
import { ERROR_MESSAGE_DURATION } from '../../constants/errors';
import { acceptInvitationRequest, cancelInvitationRequest } from '../../api/invitations';

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
        refreshUserData,
    } = props;

    const [isNotificationDrawerVisible, setNotificationDrawerVisible] = useState(false);
    const notifications = useSelector(notificationsSelector);

    const isMiniMenuSelected = (key, id) => {
        return key === miniMenuItem && id === miniMenuItemId;
    };

    const openNotificationsDrawer = () => {
        setNotificationDrawerVisible(true);
    };

    const closeNotificationsDrawer = () => {
        setNotificationDrawerVisible(false);
    };

    const handleCancelInvitation = (invitationId) => {
        cancelInvitationRequest(invitationId)
            .then(() => refreshUserData())
            .catch(errors => message.error(errors?.common, ERROR_MESSAGE_DURATION));
    };

    const handleAcceptInvitation = (invitationId) => {
        acceptInvitationRequest(invitationId)
            .then(() => refreshUserData())
            .catch(errors => message.error(errors?.common, ERROR_MESSAGE_DURATION));
    };

    const renderNotificationsDrawer = () => {
        return (
            <Drawer
                title='Уведомления'
                placement='right'
                width={360}
                onClose={closeNotificationsDrawer}
                visible={isNotificationDrawerVisible}
            >
                {notifications && notifications.length ? (
                    notifications.map(({ id, content, createdAt, type }) => type === 'INVITATION' && (
                        <Card key={id} className='left-sider__notification'>
                            <Row gutter={[0, 14]} style={{ marginBottom: 0 }}>
                                <Col span={24}>
                                    <Row>
                                        <Col span={24}>{content.title}</Col>
                                    </Row>
                                    <Row justify='end'>
                                        <Col>
                                            <Typography.Text type='secondary'>
                                                {toDisplayDateTime(createdAt)}
                                            </Typography.Text>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={24}>
                                    <Row justify='end' gutter={10}>
                                        <Col>
                                            <Button
                                                danger
                                                onClick={() => handleCancelInvitation(content.id)}
                                            >
                                                Отклонить
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button
                                                type='primary'
                                                onClick={() => handleAcceptInvitation(content.id)}
                                            >
                                                Принять
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    ))
                ) : (
                    <Empty description='Список пуст' />
                )}
            </Drawer>
        );
    };

    return (
        <div className='left-sider'>
            {renderNotificationsDrawer()}
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
                        <Avatar
                            className={cn('left-sider__mini-menu-item', 'left-sider__question-avatar')}
                            gap={4}
                            size='large'
                        >
                            <QuestionOutlined />
                        </Avatar>
                        <Badge count={notifications.length}>
                            <Avatar
                                className={cn('left-sider__mini-menu-item', 'left-sider__notifications-avatar')}
                                gap={4}
                                size='large'
                                onClick={openNotificationsDrawer}
                            >
                                <BellOutlined />
                            </Avatar>
                        </Badge>
                        {miniMenuBottomItems.map(({ key, id, name, fullName, email }) => (
                            <Tooltip
                                key={`${key}_${id}`}
                                title={`${fullName} (${email})`}
                                color='blue'
                                placement='right'
                            >
                                <Avatar
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
                            </Tooltip>
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
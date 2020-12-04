import './WalletUsers.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    Card,
    Col,
    Row,
    Typography,
    Empty,
    Space,
    message,
    Avatar,
    Button,
    Select,
    Spin
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { isInviteLoadingSelector, walletsSelector } from '../../../../store/modules/wallets/selectors';
import { walletEnhancer, walletUsersEnhancer } from '../../../../store/modules/wallets/selectorEnhancers';
import { SUCCESS_MESSAGE_DURATION } from '../../../../constants/errors';
import { userSelector } from '../../../../store/modules/user/selectors';
import { getUsersRequest } from '../../../../api/users';
import { inviteUser } from '../../../../store/modules/wallets/thunks';
import { handleErrors } from '../../../../utils/handleErrors';

const INVITATION_SUCCESS_MESSAGE = 'Приглашение отправлено!';

export const WalletUsers = () => {
    const { walletId } = useParams();
    const [foundUsers, setFoundUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isUsersSearching, setIsUsersSearching] = useState(false);
    const dispatch = useDispatch();

    const currentUser = useSelector(userSelector);
    const isInviteLoading = useSelector(isInviteLoadingSelector);
    const wallet = walletEnhancer(useSelector(walletsSelector))(walletId);
    const walletUsers = walletUsersEnhancer(wallet);

    const handleUserInvite = () => {
        if (!selectedUserId) return;
        dispatch(inviteUser(walletId, selectedUserId))
            .then(() => {
                message.success(INVITATION_SUCCESS_MESSAGE, SUCCESS_MESSAGE_DURATION);
                setSelectedUserId(null);
            })
            .catch(handleErrors(message));
    };

    const handleUserSearch = (search) => {
        setIsUsersSearching(true);
        getUsersRequest(search)
            .then(resp => setFoundUsers(resp.data.data?.users))
            .catch(handleErrors(message))
            .finally(() => setIsUsersSearching(false));
    };

    const handleUserChange = (userId) => {
        setSelectedUserId(userId);
    };

    const renderInviteBlock = () => {
        return (
            <Row className='wallet-users__users-row' gutter={[10, 10]}>
                <Col className='wallet-users__users-select-col'>
                    <Select
                        className='wallet-users__users-select'
                        showSearch
                        value={selectedUserId}
                        notFoundContent={isUsersSearching ? <Spin size="small" /> : null}
                        placeholder="Имя пользователя или почтовый адрес..."
                        filterOption={false}
                        onChange={handleUserChange}
                        onSearch={handleUserSearch}
                    >
                        {(foundUsers || []).map(({ id, displayName, email }) => (
                            <Select.Option key={id} value={id}>
                                <Space direction='horizontal'>
                                    <span>
                                        <Typography.Text strong>{displayName}</Typography.Text>
                                        {currentUser?.id === id && (
                                            <Typography.Text type='secondary'>&nbsp;(Вы)</Typography.Text>
                                        )}
                                    </span>
                                    <Typography.Text type='secondary'>{email}</Typography.Text>
                                </Space>
                            </Select.Option>
                        ))}
                    </Select>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        loading={isInviteLoading}
                        onClick={handleUserInvite}
                    >
                        Пригласить
                    </Button>
                </Col>
            </Row>
        );
    };

    const renderUsersList = () => {
        return (walletUsers && walletUsers.length ?
            walletUsers.map(({ id, displayName, email }) => (
                <Card key={id} hoverable size='small'>
                    <Row gutter={16} align='middle'>
                        <Col>
                            <Row gutter={10} align='middle'>
                                <Col>
                                    <Avatar
                                        className='wallet-users__user-avatar'
                                        size='small'
                                        icon={<UserOutlined />}
                                    />
                                </Col>
                                <Col>
                                    <Typography.Text strong>{displayName}</Typography.Text>
                                    {currentUser?.id === id && (
                                        <Typography.Text type='secondary'>&nbsp;(Вы)</Typography.Text>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Typography.Text type='secondary'>{email}</Typography.Text>
                        </Col>
                    </Row>
                </Card>
            ))
            : <Empty description='Список пуст' />
        );
    };

    const renderForm = () => {
        return (
            <Row className='wallet-users'>
                <Col span={24} lg={18} xl={14}>
                    <Row>
                        <Col span={24}>
                            <Typography.Title>Пользователи</Typography.Title>
                        </Col>
                    </Row>
                    <Row gutter={[10, 15]}>
                        <Col span={24}>{renderInviteBlock()}</Col>
                        <Col span={24}>{renderUsersList()}</Col>
                    </Row>
                </Col>
            </Row>
        );
    };

    return renderForm();
};

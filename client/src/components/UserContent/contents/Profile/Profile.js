import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Col, Row, Space, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { userSelector } from '../../../../store/modules/user/selectors';

export const Profile = () => {
    const user = useSelector(userSelector);

    const renderForm = () => {
        return (
            <Row className='profile'>
                <Col span={24}>
                    <Typography.Title>
                        <Space direction='horizontal' align='center' size={14}>
                            <Avatar size={52} icon={<UserOutlined />} />
                            {user?.displayName}
                        </Space>
                    </Typography.Title>
                </Col>
                <Col span={24}>
                    <Typography.Title level={4}>
                        <Typography.Text type='secondary'>Почта:&nbsp;</Typography.Text>
                        <Typography.Text>{user?.email}</Typography.Text>
                    </Typography.Title>
                </Col>
            </Row>
        );
    };

    return renderForm();
};

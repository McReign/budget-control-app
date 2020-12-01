import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Typography } from 'antd';
import { userSelector } from '../../../../store/modules/user/selectors';

export const Profile = () => {
    const user = useSelector(userSelector);

    const renderForm = () => {
        return (
            <Row className='profile'>
                <Col span={24}>
                    <Typography.Title>{user?.displayName}</Typography.Title>
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

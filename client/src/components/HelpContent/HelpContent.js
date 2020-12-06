import { Col, Result, Row, Typography } from 'antd';
import React from 'react';

export const HelpContent = () => {
    return (
        <Row className='help-content'>
            <Col span={24} lg={18} xl={14}>
                <Row>
                    <Col span={24}>
                        <Typography.Title>Помощь</Typography.Title>
                    </Col>
                </Row>
                <Row gutter={[10, 15]}>
                    <Col span={24}>
                        <Result
                            status='404'
                            title='Страница не существует!'
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};
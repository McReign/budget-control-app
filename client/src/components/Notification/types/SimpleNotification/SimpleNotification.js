import '../../Notification.scss';
import React, { useCallback } from 'react';
import { Button, Card, Col, Row, Typography } from 'antd';
import { toDisplayDateTime } from '../../../../utils/toDisplayDateTime';

export const SimpleNotification = ({ notification, onClose }) => {
    const createdAt = notification?.createdAt;
    const content = notification?.content;

    const handleClose = useCallback(() => {
        onClose && onClose(content?.id);
    }, [onClose, content]);

    return (
        <Card key={content.id} className='notification'>
            <Row gutter={[0, 14]} className='notification__content-row'>
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
                            <Button type='primary' onClick={handleClose}>
                                Закрыть
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
};

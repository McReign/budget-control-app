import './TransactionModal.scss';
import React from 'react';
import { Button, Col, Descriptions, Modal, Row, Space, Tag, Typography } from 'antd';
import { withRubleSign } from '../../utils/withRubleSign';
import { withNumberGroupSeparator } from '../../utils/withNumberGroupSeparator';
import { toDisplayDate } from '../../utils/toDisplayDate';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/modules/user/selectors';

const generateButtons = (onCancel) => {
    const buttons = [
        <Button key='cancel' onClick={onCancel}>
            Закрыть
        </Button>,
    ];

    return [];
};

export const TransactionModalView = ({ transaction, visible, onCancel }) => {
    const currentUser = useSelector(userSelector);

    const buttons = generateButtons(onCancel);

    return (
        <Modal
            className='transaction-modal'
            width={420}
            visible={visible}
            title={'Транзакция'}
            onCancel={onCancel}
            footer={null}
        >
            <Descriptions layout='horizontal' column={24} bordered size='small'>
                <Descriptions.Item label="Сумма" span={24}>
                    <Typography.Text strong>
                        {withRubleSign(withNumberGroupSeparator(transaction?.amount, ' '))}
                    </Typography.Text>
                </Descriptions.Item>
                <Descriptions.Item label="Тип операции" span={24}>
                    <Typography.Text type={transaction?.type === 'INCOME' ? 'success' : 'danger'}>
                        {transaction?.type === 'INCOME' ? 'Доход' : 'Расход'}
                    </Typography.Text>
                </Descriptions.Item>
                <Descriptions.Item label="Категория" span={24}>
                    {transaction?.category?.displayName}
                </Descriptions.Item>
                <Descriptions.Item label="Пользователь" span={24}>
                    <Row gutter={10}>
                        <Col>
                            <Typography.Text strong>{transaction?.user?.displayName}</Typography.Text>
                            {currentUser?.id === transaction?.user?.id && (
                                <Typography.Text type='secondary'>&nbsp;(Вы)</Typography.Text>
                            )}
                        </Col>
                        <Col>
                            <Typography.Text type='secondary'>
                                ({transaction?.user?.email})
                            </Typography.Text>
                        </Col>
                    </Row>
                </Descriptions.Item>
                <Descriptions.Item label="Дата операции" span={24}>
                    {toDisplayDate(transaction?.date)}
                </Descriptions.Item>
                {transaction?.tags?.length && (
                    <Descriptions.Item label="Тэги" span={24}>
                        {transaction?.tags.map((tag, index) => <Tag key={index}>{tag}</Tag>)}
                    </Descriptions.Item>
                )}
                {transaction?.note && (
                    <Descriptions.Item label="Заметка" span={24}>
                        {transaction?.note}
                    </Descriptions.Item>
                )}
            </Descriptions>
            <Space className='transaction-modal__buttons-wrapper' direction='horizontal'>
                {buttons.map(button => button)}
            </Space>
        </Modal>
    );
};

import './TransactionModal.scss';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Col, DatePicker, Form, InputNumber, Modal, Row, Select, Space } from 'antd';
import { EMPTY_FIELD_ERROR } from '../../constants/errors';
import { withRubleSign } from '../../utils/withRubleSign';
import { categoriesSelector } from '../../store/modules/categories/selectors';
import moment from 'moment';

const generateButtons = (isNew, loading, onSave, onAdd, onCancel) => {
    const buttons = [
        <Button key='cancel' onClick={onCancel}>
            Отмена
        </Button>,
    ];

    if (isNew) {
        buttons.push(
            <Button
                key='add'
                type='primary'
                htmlType='submit'
                loading={loading}
            >
                Добавить
            </Button>
        );
    } else {
        buttons.push(
            <Button
                key='save'
                type='primary'
                htmlType='submit'
                loading={loading}
            >
                Сохранить
            </Button>
        );
    }

    return buttons;
};

export const TransactionModal = ({ isNew, transaction, visible, loading, onCancel, onSave, onAdd }) => {
    const [ownTransaction, setOwnTransaction] = useState(transaction || {});
    const categories = useSelector(categoriesSelector);
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible) {
            setOwnTransaction(transaction || {});
        } else {
            setOwnTransaction({});
            form.resetFields();
        }
    }, [visible]);

    const title = isNew ? 'Добавление транзакции' : 'Транзакция';

    const buttons = generateButtons(isNew, loading, onSave, onAdd, onCancel);

    const handleAdd = () => {
        onAdd(ownTransaction);
    };

    const handleSave = () => {
        onSave(ownTransaction);
    };

    const handleFinish = () => {
        if (isNew) {
            return handleAdd();
        }
        return handleSave();
    };

    const handleAmountChange = (amount) => {
        setOwnTransaction(ownTransaction => ({ ...ownTransaction, amount }));
    };

    const handleTypeChange = (type) => {
        setOwnTransaction(ownTransaction => ({ ...ownTransaction, type }));
    };

    const handleCategoryChange = (categoryId) => {
        const category = categories.find(category => category.id === categoryId);
        setOwnTransaction(ownTransaction => ({ ...ownTransaction, category }));
    };

    const handleDateChange = (date) => {
        setOwnTransaction(ownTransaction => ({ ...ownTransaction, date: (date && date.format()) || null }));
    };

    return (
        <Modal
            className='transaction-modal'
            width={380}
            visible={visible}
            title={title}
            onCancel={onCancel}
            footer={null}
        >
            <Form layout="vertical" form={form} onFinish={handleFinish}>
                <Form.Item
                    label="Сумма"
                    name="amount"
                    rules={[{ required: true, message: EMPTY_FIELD_ERROR }]}
                >
                    <InputNumber
                        className='transaction-modal__amount-input'
                        value={ownTransaction.amount}
                        placeholder={'Сумма'}
                        formatter={value => (value && withRubleSign(value).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')) || ''}
                        onChange={handleAmountChange}
                    />
                </Form.Item>

                <Form.Item noStyle>
                    <Row gutter={10}>
                        <Col span={12}>
                            <Form.Item
                                label="Тип операции"
                                name="type"
                                rules={[{ required: true, message: EMPTY_FIELD_ERROR }]}
                            >
                                <Select
                                    value={ownTransaction.type}
                                    placeholder={'Тип операции'}
                                    onChange={handleTypeChange}
                                >
                                    <Select.Option value='EXPENSE'>Трата</Select.Option>
                                    <Select.Option value='INCOME'>Доход</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Категория"
                                name="category"
                                rules={[{ required: true, message: EMPTY_FIELD_ERROR }]}
                            >
                                <Select
                                    value={ownTransaction.category?.id}
                                    showSearch
                                    placeholder={'Категория'}
                                    optionFilterProp='children'
                                    onChange={handleCategoryChange}
                                >
                                    {(categories || []).map(category => (
                                        <Select.Option key={category.id} value={category.id}>
                                            {category.displayName}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item
                    label="Дата операции"
                    name="date"
                    rules={[{ required: true, message: EMPTY_FIELD_ERROR }]}
                >
                    <DatePicker
                        className='transaction-modal__date-input'
                        value={moment(ownTransaction.date)}
                        format={'DD.MM.YYYY'}
                        placeholder={'Дата операции'}
                        onChange={handleDateChange}
                    />
                </Form.Item>

                <Form.Item noStyle>
                    <Space className='transaction-modal__buttons-wrapper' direction='horizontal'>
                        {buttons.map((button, index) => (
                            <Form.Item key={index} noStyle>
                                {button}
                            </Form.Item>
                        ))}
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};

import './TransactionModal.scss';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Col, DatePicker, Form, Input, InputNumber, Modal, Row, Select, Space } from 'antd';
import { EMPTY_FIELD_ERROR } from '../../constants/errors';
import { withRubleSign } from '../../utils/withRubleSign';
import { walletCategoriesSelector } from '../../store/modules/categories/selectors';
import { incomeCategoriesEnhancer, expenseCategoriesEnhancer } from '../../store/modules/categories/selectorEnhancers';
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

export const TransactionModalEdit = ({ isNew, transaction, visible, loading, onCancel, onSave, onAdd }) => {
    const [ownTransaction, setOwnTransaction] = useState(transaction || {});
    const categories = useSelector(walletCategoriesSelector);
    const incomeCategories = incomeCategoriesEnhancer(categories);
    const expenseCategories = expenseCategoriesEnhancer(categories);

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

    const typedCategories = {
        'INCOME': incomeCategories,
        'EXPENSE': expenseCategories,
    };

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
        handleCategoryChange([])(null);
        setOwnTransaction(ownTransaction => ({ ...ownTransaction, type }));
    };

    const handleCategoryChange = (categories) => (categoryId) => {
        if (!categoryId) {
            setOwnTransaction(ownTransaction => ({ ...ownTransaction, category: null }))
        }
        const category = categories.find(category => category?.id === categoryId);
        setOwnTransaction(ownTransaction => ({ ...ownTransaction, category }));
    };

    const handleDateChange = (date) => {
        setOwnTransaction(ownTransaction => ({ ...ownTransaction, date: (date && date.format()) || null }));
    };

    const handleNoteChange = (e) => {
        e.persist();
        setOwnTransaction(ownTransaction => ({ ...ownTransaction, note: e?.target?.value }));
    };

    const handleTagsChange = (tags) => {
        setOwnTransaction(ownTransaction => ({ ...ownTransaction, tags }));
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
                <Form.Item noStyle>
                    <Row gutter={10}>
                        <Col span={12}>
                            <Form.Item
                                label="Сумма"
                                name="amount"
                                rules={[{ required: true, message: EMPTY_FIELD_ERROR }]}
                            >
                                <InputNumber
                                    className='transaction-modal__amount-input'
                                    value={ownTransaction.amount}
                                    placeholder={'Введите сумму...'}
                                    formatter={value => (value && withRubleSign(value).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')) || ''}
                                    onChange={handleAmountChange}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Дата операции" name="date">
                                <DatePicker
                                    className='transaction-modal__date-input'
                                    value={moment(ownTransaction.date)}
                                    format={'DD.MM.YYYY'}
                                    placeholder={'Введите дату операции...'}
                                    onChange={handleDateChange}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
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
                                    placeholder={'Введите тип операции...'}
                                    onChange={handleTypeChange}
                                >
                                    <Select.Option value='EXPENSE'>Расход</Select.Option>
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
                                    placeholder={'Введите категорию...'}
                                    optionFilterProp='children'
                                    onChange={handleCategoryChange(typedCategories[ownTransaction.type] || [])}
                                >
                                    {(typedCategories[ownTransaction.type] || []).map(category => (
                                        <Select.Option key={category?.id} value={category.id}>
                                            {category?.displayName}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form.Item>

                <Form.Item label="Тэги" name="tags">
                    <Select
                        mode='tags'
                        value={ownTransaction.tags}
                        placeholder={'Добавьте тэги...'}
                        notFoundContent={null}
                        onChange={handleTagsChange}
                    />
                </Form.Item>

                <Form.Item label="Заметка" name="note">
                    <Input.TextArea
                        value={ownTransaction.note}
                        placeholder={'Введите заметку...'}
                        rows={2}
                        onChange={handleNoteChange}
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

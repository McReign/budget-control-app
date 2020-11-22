import './WalletTransactions.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Col, Row, Tabs, Typography, Empty, Space, message } from 'antd';
import { ArrowRightOutlined, UserOutlined } from '@ant-design/icons';
import { RequestWrapper } from '../RequestWrapper/RequestWrapper';
import { mapStoreRequestStateToRequestStatus } from '../../utils/mapStoreRequestStateToRequestStatus';
import {
    errorsSelector,
    isLoadingSelector,
    walletExpensesSelector,
    walletIncomesSelector,
    walletOperationsSelector,
} from '../../store/modules/wallets/selectors';
import { withRubleSign } from '../../utils/withRubleSign';
import { AddButton } from '../AddButton/AddButton';
import { TransactionModalEdit } from '../TransactionModal/TransactionModalEdit';
import { addOperation } from '../../store/modules/wallets/thunks';
import { ERROR_MESSAGE_DURATION } from '../../constants/errors';
import { withNumberGroupSeparator } from '../../utils/withNumberGroupSeparator';
import { toDisplayDate } from '../../utils/toDisplayDate';
import { userSelector } from '../../store/modules/user/selectors';
import { TransactionModalView } from '../TransactionModal/TransactionModalView';

export const WalletTransactions = ({ walletId }) => {
    const dispatch = useDispatch();
    const [operationModalVisible, setOperationModalVisible] = useState(false);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [openedOperation, setOpenedOperation] = useState(null);
    const currentUser = useSelector(userSelector);
    const isOperationsLoading = useSelector(isLoadingSelector);
    const operationsError = useSelector(errorsSelector);
    const operations = useSelector(walletOperationsSelector)(walletId);
    const expenses = useSelector(walletExpensesSelector)(walletId);
    const incomes = useSelector(walletIncomesSelector)(walletId);

    const openAddModal = () => {
        setAddModalVisible(true);
    };

    const closeAddModal = () => {
        setAddModalVisible(false);
    };

    const openOperation = (operation) => {
        setOpenedOperation(operation);
        setOperationModalVisible(true);
    };

    const closeOperation = () => {
        setOperationModalVisible(false);
        setTimeout(() => setOpenedOperation(null), 100);
    };

    const handleOperationAdd = (operation) => {
        closeAddModal();
        dispatch(addOperation(walletId, operation))
            // .then(closeAddModal)
            .catch(errors => message.error(errors?.common, ERROR_MESSAGE_DURATION));
    };

    const renderTransactionsBlock = () => {
        const tabs = [
            {
                key: 'all',
                name: 'Все',
                transactions: operations,
            },
            {
                key: 'expenses',
                name: 'Расходы',
                transactions: expenses,
            },
            {
                key: 'incomes',
                name: 'Доходы',
                transactions: incomes,
            },
        ];

        return (
            <Tabs defaultActiveKey='expense'>
                {tabs.map(({ key, name, transactions }) => (
                    <Tabs.TabPane tab={name} key={key}>
                        {transactions && transactions.length ?
                            transactions.map(transaction => (
                                <Card
                                    key={transaction.id}
                                    hoverable
                                    size='small'
                                    onClick={() => openOperation(transaction)}
                                >
                                    <Row justify='space-between'>
                                        <Col>
                                            <Space direction='horizontal'>
                                                <Typography.Text type={transaction.type === 'INCOME' ? 'success' : 'danger'}>
                                                    {withRubleSign(withNumberGroupSeparator(transaction.amount, ' '))}
                                                </Typography.Text>
                                                <Typography.Text type='secondary'>
                                                    {transaction.category.displayName}
                                                </Typography.Text>
                                            </Space>
                                        </Col>
                                        <Col>
                                            <Space direction='horizontal' size={20}>
                                                <Typography.Text type='secondary'>
                                                    <Space direction='horizontal'>
                                                        <UserOutlined />
                                                        <span>
                                                            {transaction.user.displayName}&nbsp;
                                                            {currentUser.id === transaction.user.id && '(Вы)'}
                                                        </span>
                                                    </Space>
                                                </Typography.Text>
                                                <Typography.Text type='secondary'>
                                                    {toDisplayDate(transaction.date)}
                                                </Typography.Text>
                                                <ArrowRightOutlined />
                                            </Space>
                                        </Col>
                                    </Row>
                                </Card>
                            )) : <Empty description='Список пуст' />}
                    </Tabs.TabPane>
                ))}
            </Tabs>
        );
    };

    const renderForm = () => {
        return (
            <Row className='wallet-transactions'>
                <Col span={14}>
                    <Row>
                        <Col span={24}>
                            <Typography.Title>Транзакции</Typography.Title>
                        </Col>
                    </Row>
                    <Row gutter={[10, 15]}>
                        <Col span={24}>{renderTransactionsBlock()}</Col>
                    </Row>
                </Col>
                <AddButton className='wallet-transactions__add-button' onClick={openAddModal} />
                <TransactionModalEdit
                    isNew={true}
                    visible={addModalVisible}
                    onCancel={closeAddModal}
                    onAdd={handleOperationAdd}
                />
                <TransactionModalView
                    visible={operationModalVisible}
                    transaction={openedOperation}
                    onCancel={closeOperation}
                />
            </Row>
        );
    };

    return (
        <RequestWrapper
            requestStatus={mapStoreRequestStateToRequestStatus(
                operations,
                isOperationsLoading,
                operationsError,
            )}
        >
            {renderForm()}
        </RequestWrapper>
    );
};

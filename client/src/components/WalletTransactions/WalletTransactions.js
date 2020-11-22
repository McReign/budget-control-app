import './WalletTransactions.scss';
import React, { useState } from 'react';
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
import { TransactionModal } from '../TransactionModal/TransactionModal';
import { addOperation } from '../../store/modules/wallets/thunks';
import { ERROR_MESSAGE_DURATION } from '../../constants/errors';
import { withNumberGroupSeparator } from '../../utils/withNumberGroupSeparator';
import { toDisplayDate } from '../../utils/toDisplayDate';
import { userSelector } from '../../store/modules/user/selectors';

export const WalletTransactions = ({ walletId }) => {
    const dispatch = useDispatch();
    const [operationModalVisible, setOperationModalVisible] = useState(false);
    const [isNewOperation, setIsNewOperation] = useState(false);
    const [openedOperation, setOpenedOperation] = useState(null);
    const currentUser = useSelector(userSelector);
    const isOperationsLoading = useSelector(isLoadingSelector);
    const operationsError = useSelector(errorsSelector);
    const operations = useSelector(walletOperationsSelector)(walletId);
    const expenses = useSelector(walletExpensesSelector)(walletId);
    const incomes = useSelector(walletIncomesSelector)(walletId);

    const openAddModal = () => {
        setIsNewOperation(true);
        setOperationModalVisible(true);
    };

    const openOperation = (operation) => {
        setIsNewOperation(false);
        setOpenedOperation(operation);
        setOperationModalVisible(true);
    };

    const closeOperationModal = () => {
        setIsNewOperation(false);
        setOperationModalVisible(false);
        setOpenedOperation(null);
    };

    const handleOperationAdd = (operation) => {
        closeOperationModal();
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
                name: 'Траты',
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
                <TransactionModal
                    isNew={isNewOperation}
                    visible={operationModalVisible}
                    transaction={openedOperation}
                    onCancel={closeOperationModal}
                    onAdd={handleOperationAdd}
                />
            </Row>
        );
    };

    return (
        <RequestWrapper
            requestStatus={mapStoreRequestStateToRequestStatus(
                operations && operations.length,
                isOperationsLoading,
                operationsError,
            )}
        >
            {renderForm()}
        </RequestWrapper>
    );
};

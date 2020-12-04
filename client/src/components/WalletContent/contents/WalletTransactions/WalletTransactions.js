import './WalletTransactions.scss';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { Card, Col, Row, Tabs, Typography, Empty, Space, message, Divider, Tag } from 'antd';
import { ArrowRightOutlined, UserOutlined } from '@ant-design/icons';
import moment from 'moment';

import { RequestWrapper } from '../../../RequestWrapper/RequestWrapper';
import { mapStoreRequestStateToRequestStatus } from '../../../../utils/mapStoreRequestStateToRequestStatus';
import {
    errorsSelector,
    isLoadingSelector,
    walletOperationsSelector, walletsSelector,
} from '../../../../store/modules/wallets/selectors';
import {
    walletEnhancer,
    walletExpensesEnhancer,
    walletIncomesEnhancer,
    walletUsersEnhancer,
    walletCategorizedOperationsEnhancer,
    walletOperationsByUserEnhancer,
    walletDatedOperations,
    walletOperationsSumEnhancer,
    walletUserEnhancer,
    walletOperationsByPeriodEnhancer,
} from '../../../../store/modules/wallets/selectorEnhancers';
import { walletCategoriesSelector } from '../../../../store/modules/categories/selectors';
import { categoryEnhancer } from '../../../../store/modules/categories/selectorEnhancers';
import { withRubleSign } from '../../../../utils/withRubleSign';
import { AddButton } from '../../../AddButton/AddButton';
import { TransactionModalEdit } from '../../../TransactionModal/TransactionModalEdit';
import { addOperation } from '../../../../store/modules/wallets/thunks';
import { withNumberGroupSeparator } from '../../../../utils/withNumberGroupSeparator';
import { DISPLAY_DATE_FORMAT, toDisplayDate } from '../../../../utils/toDisplayDate';
import { userSelector } from '../../../../store/modules/user/selectors';
import { TransactionModalView } from '../../../TransactionModal/TransactionModalView';
import { UsersSlider } from '../../../UsersSlider/UsersSlider';
import { sortArray } from '../../../../utils/sortArray';
import { handleErrors } from '../../../../utils/handleErrors';
import { PeriodSlider } from '../../../PeriodSlider/PeriodSlider';
import { generatePeriod } from '../../../../utils/generatePeriod';

export const WalletTransactions = () => {
    const { walletId } = useParams();
    const { search } = useLocation();
    const history = useHistory();

    const query = new URLSearchParams(search);
    const category = query.get('category');
    const user = query.get('user');
    const period = (query.get('period') || '').split(',');

    const dispatch = useDispatch();

    const [operationModalVisible, setOperationModalVisible] = useState(false);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [openedOperation, setOpenedOperation] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState(period || [null, null]);

    const currentUser = useSelector(userSelector);
    const isOperationsLoading = useSelector(isLoadingSelector);
    const operationsError = useSelector(errorsSelector);

    const categories = useSelector(walletCategoriesSelector);
    const currentCategory = categoryEnhancer(categories)(category);

    const wallet = walletEnhancer(useSelector(walletsSelector))(walletId);
    const users = walletUsersEnhancer(wallet);
    const operations = useSelector(walletOperationsSelector)(walletId);
    const operationsByUser = selectedUser ? walletOperationsByUserEnhancer(operations)(selectedUser.id) : operations;
    const operationsByPeriod = walletOperationsByPeriodEnhancer(operationsByUser)(selectedPeriod);
    const operationsByUserCategoryPeriod = category ?
        (walletCategorizedOperationsEnhancer(operationsByPeriod)[category] || [])
        : operationsByPeriod;
    const expensesByUserPeriodCategory = walletExpensesEnhancer(operationsByUserCategoryPeriod);
    const incomesByUserPeriodCategory = walletIncomesEnhancer(operationsByUserCategoryPeriod);

    const datedOperationsByUserAndCategory = walletDatedOperations(operationsByUserCategoryPeriod);
    const datedExpensesByUserAndCategory = walletDatedOperations(expensesByUserPeriodCategory);
    const datedIncomesByUserAndCategory = walletDatedOperations(incomesByUserPeriodCategory);

    useLayoutEffect(() => {
        setSelectedUser(walletUserEnhancer(users)(user))
    }, [users]);

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
            .catch(handleErrors(message));
    };

    const generateTransactionsLinkQuery = (category, user, period) => {
        const queryParams = new URLSearchParams();

        category && queryParams.append('category', category.slug);
        user && queryParams.append('user', user.id);
        period && queryParams.append('period', period);

        return queryParams.toString();
    }

    const handleClearCategory = (e) => {
        e.preventDefault();
        history.push({ search: generateTransactionsLinkQuery(null, selectedUser, selectedPeriod) });
    };

    const renderTransactionsBlock = () => {
        const tabs = [
            {
                key: 'all',
                name: 'Все',
                transactions: datedOperationsByUserAndCategory,
            },
            {
                key: 'expenses',
                name: 'Расходы',
                transactions: datedExpensesByUserAndCategory,
            },
            {
                key: 'incomes',
                name: 'Доходы',
                transactions: datedIncomesByUserAndCategory,
            },
        ];

        const getSortedDates = dates => sortArray(dates, date => moment(date, DISPLAY_DATE_FORMAT));
        const getSortedTransactions = transactions => sortArray(transactions, transaction => moment(transaction.date));

        return (
            <Tabs defaultActiveKey='expense'>
                {tabs.map(({ key, name, transactions }) => {
                    const dates = (transactions && Object.keys(transactions)) || [];
                    return (
                        <Tabs.TabPane tab={name} key={key}>
                            {dates.length ? getSortedDates(dates).map(date => (
                                <Row
                                    key={date}
                                    className='wallet-transactions__dated-operations-wrapper'
                                >
                                    <Col span={24}>
                                        <Row
                                            className='wallet-transactions__dated-operations-date'
                                            justify='space-between'
                                        >
                                            <Col>
                                                <Typography.Text type='secondary'>{date}</Typography.Text>
                                            </Col>
                                            <Col>
                                                <Typography.Text type='secondary'>
                                                    {withRubleSign(withNumberGroupSeparator(
                                                        walletOperationsSumEnhancer(transactions[date] || []),
                                                        ' ',
                                                    ))}
                                                </Typography.Text>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={24}>
                                        <div className='wallet-transactions__dated-operations'>
                                            {getSortedTransactions((transactions[date] || [])).map(transaction => (
                                                <Card
                                                    key={transaction.id}
                                                    hoverable
                                                    size='small'
                                                    onClick={() => openOperation(transaction)}
                                                >
                                                    <Row justify='space-between'>
                                                        <Col>
                                                            <Space direction='horizontal' size={15}>
                                                                <Typography.Text
                                                                    type={transaction.type === 'INCOME' ? 'success' : 'danger'}
                                                                >
                                                                    {withRubleSign(
                                                                        withNumberGroupSeparator(transaction.amount, ' ')
                                                                    )}
                                                                </Typography.Text>
                                                                <Typography.Text type='secondary'>
                                                                    <Space direction='horizontal' size={6}>
                                                                        <UserOutlined />
                                                                        <span>
                                                                            {transaction.user.displayName}&nbsp;
                                                                            {currentUser?.id === transaction.user.id && '(Вы)'}
                                                                        </span>
                                                                    </Space>
                                                                </Typography.Text>
                                                            </Space>
                                                        </Col>
                                                        <Col>
                                                            <Space direction='horizontal' size={10}>
                                                                <Typography.Text type='secondary'>
                                                                    {transaction.category?.displayName}
                                                                </Typography.Text>
                                                                <ArrowRightOutlined />
                                                            </Space>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            ))}
                                        </div>
                                    </Col>
                                </Row>
                            ))
                            : (
                                <Empty description='Список пуст' />
                            )}
                        </Tabs.TabPane>
                    );
                })}
            </Tabs>
        );
    };

    const renderUsersSlider = () => {
        return (
            <UsersSlider
                key={selectedUser?.id}
                selected={selectedUser}
                users={users}
                onChange={setSelectedUser}
            />
        );
    };

    const getDatesMidPoint = (dates) => {
        return moment((moment(dates[0]).valueOf() + moment(dates[1]).valueOf()) / 2);
    };

    const renderPeriodSlider = () => {
        return (
            <PeriodSlider
                selected={generatePeriod(getDatesMidPoint(selectedPeriod))}
                onChange={setSelectedPeriod}
            />
        );
    };

    const shouldRenderUsersSlider = () => {
        return users?.length > 1;
    };

    const renderForm = () => {
        return (
            <Row className='wallet-transactions'>
                <Col span={14}>
                    <Row gutter={[15, 10]} className='wallet-transactions__title-row'>
                        <Col span={24}>
                            <Typography.Title className='wallet-transactions__title'>Транзакции</Typography.Title>
                        </Col>
                        {currentCategory && (
                            <Col span={24}>
                                <Tag
                                    className='wallet-transactions__category-tag'
                                    closable
                                    onClose={handleClearCategory}
                                >
                                    <Typography.Text
                                        className='wallet-transactions__category-tag-text'
                                        type='secondary'
                                    >
                                        {currentCategory?.displayName}
                                    </Typography.Text>
                                </Tag>
                            </Col>
                        )}
                    </Row>
                    <Row gutter={[10, 15]}>
                        {shouldRenderUsersSlider() && (
                            <>
                                <Col span={24}>
                                    <Divider className='wallet-transactions__divider' type='horizontal' />
                                </Col>
                                <Col span={24}>{renderUsersSlider()}</Col>
                                <Col span={24}>
                                    <Divider className='wallet-transactions__divider' type='horizontal' />
                                </Col>
                                <Col span={24}>{renderPeriodSlider()}</Col>
                                <Col span={24}>
                                    <Divider className='wallet-transactions__divider' type='horizontal' />
                                </Col>
                            </>
                        )}
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

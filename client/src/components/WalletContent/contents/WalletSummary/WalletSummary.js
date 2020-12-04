import './WalletSummary.scss';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Alert, Card, Col, Row, Tabs, Statistic, Typography, Empty, Space, message, Divider } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { RequestWrapper } from '../../../RequestWrapper/RequestWrapper';
import { mapStoreRequestStateToRequestStatus } from '../../../../utils/mapStoreRequestStateToRequestStatus';
import {
    errorsSelector,
    isLoadingSelector,
    walletsSelector,
    walletOperationsSelector,
} from '../../../../store/modules/wallets/selectors';
import {
    walletEnhancer,
    walletBalanceEnhancer,
    walletUsersEnhancer,
    walletExpensesEnhancer,
    walletIncomesEnhancer,
    walletOperationsSumEnhancer,
    walletUsedCategoriesEnhancer,
    walletUsedCategoriesSumsEnhancer,
    walletOperationsByUserEnhancer, walletOperationsByPeriodEnhancer,
} from '../../../../store/modules/wallets/selectorEnhancers';
import { withRubleSign } from '../../../../utils/withRubleSign';
import { AddButtonRoundFixed } from '../../../AddButton/AddButtonRoundFixed/AddButtonRoundFixed';
import { TransactionModalEdit } from '../../../TransactionModal/TransactionModalEdit';
import { addOperation } from '../../../../store/modules/wallets/thunks';
import { withNumberGroupSeparator } from '../../../../utils/withNumberGroupSeparator';
import { UsersSlider } from '../../../UsersSlider/UsersSlider';
import { PeriodSlider } from '../../../PeriodSlider/PeriodSlider';
import { WalletMenuKey } from '../../../LeftSider/menus/WalletMenu/WalletMenu';
import { handleErrors } from '../../../../utils/handleErrors';
import { AddButtonDefault } from '../../../AddButton/AddButtonDefault/AddButtonDefault';

export const WalletSummary = () => {
    const { walletId } = useParams();
    const dispatch = useDispatch();
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState([null, null]);

    const wallet = walletEnhancer(useSelector(walletsSelector))(walletId);
    const operations = useSelector(walletOperationsSelector)(walletId);

    const operationsByUser = selectedUser ? walletOperationsByUserEnhancer(operations)(selectedUser?.id) : operations;
    const operationsByPeriod = walletOperationsByPeriodEnhancer(operationsByUser)(selectedPeriod);
    const users = walletUsersEnhancer(wallet);
    const balance = walletBalanceEnhancer(wallet);
    const expenses = walletExpensesEnhancer(operationsByPeriod);
    const incomes = walletIncomesEnhancer(operationsByPeriod);
    const expensesSum = walletOperationsSumEnhancer(expenses);
    const incomesSum = walletOperationsSumEnhancer(incomes);
    const usedExpenseCategories = walletUsedCategoriesEnhancer(expenses);
    const usedExpenseCategoriesSums = walletUsedCategoriesSumsEnhancer(expenses);
    const usedIncomeCategories = walletUsedCategoriesEnhancer(incomes);
    const usedIncomeCategoriesSums = walletUsedCategoriesSumsEnhancer(incomes);

    const openAddModal = () => {
        setAddModalVisible(true);
    };

    const closeAddModal = () => {
        setAddModalVisible(false);
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

    const renderBalanceBlock = () => {
        const alertType = balance > 0 ? 'success' : balance < 0 ? 'error' : 'info';

        const message = (
            <Row justify='space-between'>
                <Col>
                    <Typography.Text type='secondary'>Баланс</Typography.Text>
                </Col>
                <Col>
                    <Typography.Text strong>
                        {withRubleSign(withNumberGroupSeparator(balance, ' '))}
                    </Typography.Text>
                </Col>
            </Row>
        );

        return <Alert message={message} type={alertType} />;
    };

    const renderExpensesSumBlock = () => {
        return (
            <Card>
                <Statistic
                    title='Расходы'
                    value={expensesSum}
                    suffix={withRubleSign()}
                    precision={2}
                    groupSeparator={' '}
                />
            </Card>
        );
    };

    const renderIncomesSumBlock = () => {
        return (
            <Card>
                <Statistic
                    title='Доходы'
                    value={incomesSum}
                    suffix={withRubleSign()}
                    precision={2}
                    groupSeparator={' '}
                />
            </Card>
        );
    };

    const renderCategorizedSumsBlock = () => {
        const tabs = [
            {
                key: 'expenses',
                name: 'Расходы',
                categories: usedExpenseCategories,
                categoriesSums: usedExpenseCategoriesSums,
            },
            {
                key: 'incomes',
                name: 'Доходы',
                categories: usedIncomeCategories,
                categoriesSums: usedIncomeCategoriesSums,
            }
        ];

        return (
            <Tabs defaultActiveKey='expenses'>
                {tabs.map(({ key, name, categories, categoriesSums }) => (
                    <Tabs.TabPane tab={name} key={key}>
                        {categories && categories.length ?
                            categories.map(category => (
                                <Link
                                    key={category?.slug}
                                    to={{
                                        pathname: `/wallets/${walletId}/${WalletMenuKey.TRANSACTIONS}`,
                                        search: generateTransactionsLinkQuery(category, selectedUser, selectedPeriod),
                                    }}
                                >
                                    <Card hoverable size='small'>
                                        <Row justify='space-between'>
                                            <Col>
                                                <Typography.Text type='secondary'>{category?.displayName}</Typography.Text>
                                            </Col>
                                            <Col>
                                                <Space direction='horizontal'>
                                                    <Typography.Text strong>
                                                        {withRubleSign(
                                                            withNumberGroupSeparator(categoriesSums[category?.slug], ' ')
                                                        )}
                                                    </Typography.Text>
                                                    <ArrowRightOutlined />
                                                </Space>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Link>
                            )) : <Empty description='Список пуст' />}
                    </Tabs.TabPane>
                ))}
            </Tabs>
        );
    };

    const renderUsersSlider = () => {
        return <UsersSlider selected={selectedUser} users={users} onChange={setSelectedUser} />;
    };

    const renderPeriodSlider = () => {
        return <PeriodSlider onChange={setSelectedPeriod} />;
    };

    const shouldRenderUsersSlider = () => {
        return users?.length > 1;
    };

    const renderForm = () => {
        return (
            <Row className='wallet-summary'>
                <Col span={24} lg={18} xl={14}>
                    <Row>
                        <Col span={24}>
                            <Typography.Title>Сводка</Typography.Title>
                        </Col>
                    </Row>
                    <Row gutter={[10, 15]}>
                        <Col span={24}>{renderBalanceBlock()}</Col>
                        {shouldRenderUsersSlider() && (
                            <>
                                <Col span={24}>
                                    <Divider className='wallet-summary__divider' type='horizontal' />
                                </Col>
                                <Col span={24}>{renderUsersSlider()}</Col>
                            </>
                        )}
                        <Col span={24}>
                            <Divider className='wallet-summary__divider' type='horizontal' />
                        </Col>
                        <Col span={24}>{renderPeriodSlider()}</Col>
                        <Col span={24}>
                            <Divider className='wallet-summary__divider' type='horizontal' />
                        </Col>
                        <Col span={24} lg={12}>{renderExpensesSumBlock()}</Col>
                        <Col span={24} lg={12}>{renderIncomesSumBlock()}</Col>
                        <Col span={24}>
                            <AddButtonDefault onClick={openAddModal}>
                                Добавить транзакцию
                            </AddButtonDefault>
                        </Col>
                        <Col span={24}>{renderCategorizedSumsBlock()}</Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <AddButtonRoundFixed onClick={openAddModal} />
                </Col>
                <TransactionModalEdit
                    isNew={true}
                    visible={addModalVisible}
                    onCancel={closeAddModal}
                    onAdd={handleOperationAdd}
                />
            </Row>
        );
    };

    return renderForm();
};

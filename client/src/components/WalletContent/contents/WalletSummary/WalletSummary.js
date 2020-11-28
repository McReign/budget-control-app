import './WalletSummary.scss';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Alert, Card, Col, Row, Tabs, Statistic, Typography, Empty, Space, message } from 'antd';
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
    walletExpensesEnhancer,
    walletIncomesEnhancer,
    walletOperationsSumEnhancer,
    walletUsedCategoriesEnhancer,
    walletUsedCategoriesSumsEnhancer,
} from '../../../../store/modules/wallets/selectorEnhancers';
import { withRubleSign } from '../../../../utils/withRubleSign';
import { AddButton } from '../../../AddButton/AddButton';
import { TransactionModalEdit } from '../../../TransactionModal/TransactionModalEdit';
import { addOperation } from '../../../../store/modules/wallets/thunks';
import { ERROR_MESSAGE_DURATION } from '../../../../constants/errors';
import { withNumberGroupSeparator } from '../../../../utils/withNumberGroupSeparator';

export const WalletSummary = () => {
    const { walletId } = useParams();
    const dispatch = useDispatch();
    const [addModalVisible, setAddModalVisible] = useState(false);

    const wallet = walletEnhancer(useSelector(walletsSelector))(walletId);
    const operations = useSelector(walletOperationsSelector)(walletId);

    const balance = walletBalanceEnhancer(wallet);
    const expenses = walletExpensesEnhancer(operations);
    const incomes = walletIncomesEnhancer(operations);
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
            .catch(errors => message.error(errors?.common, ERROR_MESSAGE_DURATION));
    };

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
                                <Card key={category} hoverable size='small'>
                                    <Row justify='space-between'>
                                        <Col>
                                            <Typography.Text type='secondary'>{category}</Typography.Text>
                                        </Col>
                                        <Col>
                                            <Space direction='horizontal'>
                                                <Typography.Text strong>
                                                    {withRubleSign(withNumberGroupSeparator(categoriesSums[category], ' '))}
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
            <Row className='wallet-summary'>
                <Col span={14}>
                    <Row>
                        <Col span={24}>
                            <Typography.Title>Сводка</Typography.Title>
                        </Col>
                    </Row>
                    <Row gutter={[10, 15]}>
                        <Col span={24}>{renderBalanceBlock()}</Col>
                        <Col span={12}>{renderExpensesSumBlock()}</Col>
                        <Col span={12}>{renderIncomesSumBlock()}</Col>
                        <Col span={24}>{renderCategorizedSumsBlock()}</Col>
                    </Row>
                </Col>
                <AddButton className='wallet-summary__add-button' onClick={openAddModal} />
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

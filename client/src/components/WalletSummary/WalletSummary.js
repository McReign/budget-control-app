import './WalletSummary.scss';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Card, Col, Row, Tabs, Statistic, Typography, Empty, Space, message } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { RequestWrapper } from '../RequestWrapper/RequestWrapper';
import { mapStoreRequestStateToRequestStatus } from '../../utils/mapStoreRequestStateToRequestStatus';
import {
    errorsSelector,
    isLoadingSelector,
    walletSelector,
    walletBalanceSelector,
    walletUsedExpenseCategoriesSelector,
    walletUsedIncomeCategoriesSelector,
    walletUsedExpenseCategoriesSumsSelector,
    walletUsedIncomeCategoriesSumsSelector,
    walletExpensesSumSelector,
    walletIncomesSumSelector,
} from '../../store/modules/wallets/selectors';
import { withRubleSign } from '../../utils/withRubleSign';
import { AddButton } from '../AddButton/AddButton';
import { TransactionModal } from '../TransactionModal/TransactionModal';
import { addOperation } from '../../store/modules/wallets/thunks';
import { ERROR_MESSAGE_DURATION } from '../../constants/errors';
import { withNumberGroupSeparator } from '../../utils/withNumberGroupSeparator';

export const WalletSummary = ({ walletId }) => {
    const dispatch = useDispatch();
    const [addModalVisible, setAddModalVisible] = useState(false);
    const isOperationsLoading = useSelector(isLoadingSelector);
    const operationsError = useSelector(errorsSelector);
    const wallet = useSelector(walletSelector)(walletId);
    const balance = useSelector(walletBalanceSelector)(walletId);
    const expensesSum = useSelector(walletExpensesSumSelector)(walletId);
    const incomesSum = useSelector(walletIncomesSumSelector)(walletId);
    const usedExpenseCategories = useSelector(walletUsedExpenseCategoriesSelector)(walletId);
    const usedExpenseCategoriesSums = useSelector(walletUsedExpenseCategoriesSumsSelector)(walletId);
    const usedIncomeCategories = useSelector(walletUsedIncomeCategoriesSelector)(walletId);
    const usedIncomeCategoriesSums = useSelector(walletUsedIncomeCategoriesSumsSelector)(walletId);

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
                    title='Траты'
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
                name: 'Траты',
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
                <TransactionModal
                    isNew={true}
                    visible={addModalVisible}
                    onCancel={closeAddModal}
                    onAdd={handleOperationAdd}
                />
            </Row>
        );
    };

    return (
        <RequestWrapper
            requestStatus={mapStoreRequestStateToRequestStatus(wallet, isOperationsLoading, operationsError)}
        >
            {renderForm()}
        </RequestWrapper>
    );
};

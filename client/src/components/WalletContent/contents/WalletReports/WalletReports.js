import './WalletReports.scss';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    Card,
    Col,
    Row,
    Typography,
    Empty,
    Space,
    Divider,
    Form,
    DatePicker,
    Select,
    Button, Tag,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import printDOM from 'print-dom';
import printJS from 'print-js';
import { Bar, Doughnut } from 'react-chartjs-2';
import 'chartjs-plugin-colorschemes';

import { walletOperationsSelector, walletsSelector } from '../../../../store/modules/wallets/selectors';
import {
    walletEnhancer,
    walletExpensesEnhancer,
    walletIncomesEnhancer,
    walletUsersEnhancer,
    walletDatedOperations,
    walletOperationsSumEnhancer,
    walletOperationsByPeriodEnhancer,
    walletOperationsByTypeEnhancer,
    walletOperationsByUsersEnhancer,
    walletUsedCategoriesEnhancer,
    walletUsedCategoriesSumsEnhancer,
    walletTaggedOperationsEnhancer,
    walletUsedTagsEnhancer, walletUsedTagsSumsEnhancer,
} from '../../../../store/modules/wallets/selectorEnhancers';
import { withRubleSign } from '../../../../utils/withRubleSign';
import { withNumberGroupSeparator } from '../../../../utils/withNumberGroupSeparator';
import { DISPLAY_DATE_FORMAT } from '../../../../utils/toDisplayDate';
import { sortArray, SortDirection } from '../../../../utils/sortArray';

const DEFAULT_CHART_OPTIONS = {
    tooltips: {
        callbacks: {
            label: (tooltipItem, data, i) => {
                const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                const label = data.labels[tooltipItem.index];
                return `${label}: ${withRubleSign(withNumberGroupSeparator(value, ' '))}`;
            }
        }
    },
    plugins: {
        colorschemes: {
            scheme: 'office.Parallax6',
        },
    },
};

export const WalletReports = () => {
    const { walletId } = useParams();

    const [selectedUsers, setSelectedUsers] = useState(null);
    const [selectedOperationType, setSelectedOperationType] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState([null, null]);
    
    const [generatedReport, setGeneratedReport] = useState(null);
    const [isReportGenerating, setIsReportGenerating] = useState(false);

    const wallet = walletEnhancer(useSelector(walletsSelector))(walletId);
    
    const walletUsers = walletUsersEnhancer(wallet);
    const walletOperations = useSelector(walletOperationsSelector)(walletId);

    const handleGenerateReport = async () => {
        setIsReportGenerating(true);
        const report = await generateReport();
        setGeneratedReport(report);
        setIsReportGenerating(false);
    };

    const handlePeriodChange = (momentPeriod) => {
        setSelectedPeriod(momentPeriod ? momentPeriod.map(date => date && date.toDate()): [null, null]);
    };

    const handlePrint = () => {
        printDOM(document.querySelector('.wallet-reports'), {
            noPrint: ['.wallet-reports__buttons-row', '.wallet-reports__chart-col'],
        });
        // printJS({
        //     printable: 'wallet-reports',
        //     targetStyles: ['*'],
        //     type: 'html',
        //     maxWidth: 500,
        // });
    };

    const generateReport = useCallback(() => {
        const generatedReport = {
            transactions: {},
            categories: {},
            tags: null,
        };

        const operationsByUsers = selectedUsers?.length ?
            walletOperationsByUsersEnhancer(walletOperations)(selectedUsers)
            : walletOperations;
        const operationsByUsersPeriod = walletOperationsByPeriodEnhancer(operationsByUsers)(selectedPeriod);
        const operationsByUsersPeriodType = selectedOperationType ?
            walletOperationsByTypeEnhancer(operationsByUsersPeriod)(selectedOperationType)
            : operationsByUsersPeriod;
        const expensesByUsersPeriodType = walletExpensesEnhancer(operationsByUsersPeriodType);
        const incomesByUsersPeriodType = walletIncomesEnhancer(operationsByUsersPeriodType);

        const usedOperationsTags = walletUsedTagsEnhancer(operationsByUsersPeriodType);
        const usedExpenseTags = walletUsedTagsEnhancer(expensesByUsersPeriodType);
        const usedIncomeTags = walletUsedTagsEnhancer(incomesByUsersPeriodType);

        const usedOperationsTagsSums = walletUsedTagsSumsEnhancer(operationsByUsersPeriodType);
        const usedExpenseTagsSums = walletUsedTagsSumsEnhancer(expensesByUsersPeriodType);
        const usedIncomeTagsSums = walletUsedTagsSumsEnhancer(incomesByUsersPeriodType);

        const usedExpenseCategories = walletUsedCategoriesEnhancer(expensesByUsersPeriodType);
        const usedExpenseCategoriesSums = walletUsedCategoriesSumsEnhancer(expensesByUsersPeriodType);
        const usedIncomeCategories = walletUsedCategoriesEnhancer(incomesByUsersPeriodType);
        const usedIncomeCategoriesSums = walletUsedCategoriesSumsEnhancer(incomesByUsersPeriodType);

        const datedExpensesByUsersPeriodType = walletDatedOperations(expensesByUsersPeriodType);
        const datedIncomesByUsersPeriodType = walletDatedOperations(incomesByUsersPeriodType);

        if (selectedOperationType === 'EXPENSE') {
            generatedReport.transactions = {
                types: {
                    expenses: datedExpensesByUsersPeriodType,
                },
                sums: {
                    expenses: walletOperationsSumEnhancer(expensesByUsersPeriodType),
                }
            };
            generatedReport.categories = {
                types: {
                    expenses: usedExpenseCategories,
                },
                sums: {
                    expenses: usedExpenseCategoriesSums,
                }
            };
            if (usedExpenseTags?.length) {
                generatedReport.tags = {
                    list: usedExpenseTags,
                    sums: usedExpenseTagsSums,
                };
            }
        } else if (selectedOperationType === 'INCOME') {
            generatedReport.transactions = {
                types: {
                    incomes: datedIncomesByUsersPeriodType,
                },
                sums: {
                    incomes: walletOperationsSumEnhancer(incomesByUsersPeriodType),
                }
            };
            generatedReport.categories = {
                types: {
                    incomes: usedIncomeCategories,
                },
                sums: {
                    incomes: usedIncomeCategoriesSums,
                }
            };
            if (usedIncomeTags?.length) {
                generatedReport.tags = {
                    list: usedIncomeTags,
                    sums: usedIncomeTagsSums,
                };
            }
        } else {
            generatedReport.transactions = {
                types: {
                    expenses: datedExpensesByUsersPeriodType,
                    incomes: datedIncomesByUsersPeriodType,
                },
                sums: {
                    expenses: walletOperationsSumEnhancer(expensesByUsersPeriodType),
                    incomes: walletOperationsSumEnhancer(incomesByUsersPeriodType),
                }
            };
            generatedReport.categories = {
                types: {
                    expenses: usedExpenseCategories,
                    incomes: usedIncomeCategories,
                },
                sums: {
                    expenses: usedExpenseCategoriesSums,
                    incomes: usedIncomeCategoriesSums,
                }
            };
            if (usedOperationsTags?.length) {
                generatedReport.tags = {
                    list: usedOperationsTags,
                    sums: usedOperationsTagsSums,
                };
            }
        }
        
        return new Promise(res => setTimeout(() => res(generatedReport), 800));
    }, [selectedUsers, selectedPeriod, selectedOperationType, walletOperations]);

    const getSortedDates = (dates, fromMinToMax) => sortArray(
        dates,
        date => moment(date, DISPLAY_DATE_FORMAT),
        fromMinToMax ? SortDirection.ASC : SortDirection.DESC,
    );
    const getSortedTransactions = transactions => sortArray(transactions, transaction => moment(transaction.date));

    const renderTransactions = (datedTransactions) => {
        const dates = (datedTransactions && Object.keys(datedTransactions)) || [];
        
        return dates.length ?
            getSortedDates(dates).map(date => (
                <Row key={date} className='wallet-reports__dated-operations-wrapper'>
                    <Col span={24}>
                        <Row
                            className='wallet-reports__dated-operations-date'
                            justify='space-between'
                        >
                            <Col>
                                <Typography.Text type='secondary'>{date}</Typography.Text>
                            </Col>
                            <Col>
                                <Typography.Text type='secondary'>
                                    {withRubleSign(withNumberGroupSeparator(
                                        walletOperationsSumEnhancer(datedTransactions[date] || []),
                                        ' ',
                                    ))}
                                </Typography.Text>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <div className='wallet-reports__dated-operations'>
                            {getSortedTransactions((datedTransactions[date] || [])).map(transaction => (
                                <Card key={transaction?.id} hoverable size='small'>
                                    <Row gutter={[10, 6]} className='wallet-reports__dated-operations-card-row'>
                                        <Col span={24}>
                                            <Row justify='space-between'>
                                                <Col>
                                                    <Space direction='horizontal' size={15}>
                                                        <Typography.Text
                                                            type={transaction?.type === 'incomes' ? 'success' : 'danger'}
                                                        >
                                                            {withRubleSign(
                                                                withNumberGroupSeparator(transaction?.amount, ' ')
                                                            )}
                                                        </Typography.Text>
                                                        <Typography.Text type='secondary'>
                                                            <Space direction='horizontal' size={6}>
                                                                <UserOutlined />
                                                                {transaction?.user?.displayName}
                                                            </Space>
                                                        </Typography.Text>
                                                    </Space>
                                                </Col>
                                                <Col>
                                                    <Typography.Text type='secondary'>
                                                        {transaction?.category?.displayName}
                                                    </Typography.Text>
                                                </Col>
                                            </Row>
                                        </Col>
                                        {!!transaction?.note && (
                                            <Col span={24}>
                                                <Row>
                                                    <Col>
                                                        {transaction.note}
                                                    </Col>
                                                </Row>
                                            </Col>
                                        )}
                                        {!!transaction?.tags?.length && (
                                            <Col span={24}>
                                                <Row>
                                                    {transaction.tags.map((tag, index) => (
                                                        <Col key={index}>
                                                            <Tag>{tag}</Tag>
                                                        </Col>
                                                    ))}
                                                </Row>
                                            </Col>
                                        )}
                                    </Row>
                                </Card>
                            ))}
                        </div>
                    </Col>
                </Row>
            ))
            : (
                <Empty description='Список пуст' />
            );
    };

    const renderTransactionsBlock = () => {
        if (!generatedReport) return null;

        const generatedDatedTransactions = generatedReport.transactions.types || {};
        const generatedTransactionsSums = generatedReport.transactions.sums || {};
        const existedOperationTypes = Object.keys(generatedDatedTransactions);

        return existedOperationTypes.map(type => (
            <Row key={`${type}-transactions`} className={'wallet-reports__block'} gutter={[10, 20]}>
                <Col span={24}>
                    <Row style={{ alignItems: 'baseline' }} justify='space-between'>
                        <Col>
                            <Typography.Title level={3} type={type === 'incomes' ? 'success' : 'danger'}>
                                {type === 'incomes' ? 'Доходы' : 'Расходы'}
                            </Typography.Title>
                        </Col>
                        {!!generatedTransactionsSums[type] && (
                            <Col>
                                <Typography.Title level={4} type='secondary'>
                                    {withRubleSign(withNumberGroupSeparator(generatedTransactionsSums[type], ' '))}
                                </Typography.Title>
                            </Col>
                        )}
                    </Row>
                </Col>
                {!!generatedTransactionsSums[type] && (() => {
                    const dates = getSortedDates(Object.keys(generatedDatedTransactions[type] || {}), true);
                    const sumsByDate = dates.map(date => {
                        return walletOperationsSumEnhancer(generatedDatedTransactions[type][date] || []);
                    });
                    return (
                        <Col className='wallet-reports__chart-col' span={24}>
                            <Bar
                                data={{
                                    labels: dates,
                                    datasets: [{
                                        label: 'Распределение по дням',
                                        data: sumsByDate,
                                    }]
                                }}
                                options={DEFAULT_CHART_OPTIONS}
                            />
                        </Col>
                    );
                })()}
                <Col span={24}>
                    {renderTransactions(generatedDatedTransactions[type])}
                </Col>
            </Row>
        ));
    };

    const renderCategories = (categories, categoriesSums) => {
        return categories && categories.length ?
            categories.map(category => (
                <Card key={category?.id} hoverable size='small'>
                    <Row justify='space-between'>
                        <Col>
                            <Typography.Text type='secondary'>{category?.displayName}</Typography.Text>
                        </Col>
                        <Col>
                            <Typography.Text strong>
                                {withRubleSign(
                                    withNumberGroupSeparator(categoriesSums[category?.slug], ' ')
                                )}
                            </Typography.Text>
                        </Col>
                    </Row>
                </Card>
            )) : (
                <Empty description='Список пуст' />
            );
    }

    const renderCategoriesBlock = () => {
        if (!generatedReport) return null;

        const generatedCategories = generatedReport.categories.types || {};
        const generatedCategoriesSums = generatedReport.categories.sums || {};
        const existedCategoriesTypes = Object.keys(generatedCategories);

        return existedCategoriesTypes.map(type => (
            <Row key={`${type}-categories`} className={'wallet-reports__block'} gutter={[10, 20]}>
                <Col span={24}>
                    <Typography.Title level={3} type={type === 'incomes' ? 'success' : 'danger'}>
                        {type === 'incomes' ? 'Доходы' : 'Расходы'}
                    </Typography.Title>
                </Col>
                {!!generatedCategories[type]?.length && (
                    <Col className='wallet-reports__chart-col' span={24}>
                        <Doughnut
                            data={{
                                labels: generatedCategories[type].map(category => category?.displayName),
                                datasets: [{
                                    data: Object.values(generatedCategoriesSums[type] || {}),
                                }]
                            }}
                            options={DEFAULT_CHART_OPTIONS}
                        />
                    </Col>
                )}
                <Col span={24}>
                    {renderCategories(generatedCategories[type], generatedCategoriesSums[type])}
                </Col>
            </Row>
        ));
    };

    const renderTags = (tags, tagsSums) => {
        return tags && tags.length ?
            tags.map((tag, index) => (
                <Card key={index} hoverable size='small'>
                    <Row justify='space-between'>
                        <Col>
                            <Typography.Text type='secondary'>{tag}</Typography.Text>
                        </Col>
                        <Col>
                            <Typography.Text strong>
                                {withRubleSign(
                                    withNumberGroupSeparator(tagsSums[tag], ' ')
                                )}
                            </Typography.Text>
                        </Col>
                    </Row>
                </Card>
            )) : (
                <Empty description='Список пуст' />
            );
    };

    const renderTagsBlock = () => {
        if (!generatedReport?.tags) return null;
        return (
            <Row style={{ marginTop: 10 }}>
                <Col span={24}>
                    {renderTags(generatedReport.tags.list || [], generatedReport.tags.sums || {})}
                </Col>
            </Row>
        );
    };

    const initialFormValues = {
        period: [null, null],
        type: null,
        users: [],
    };

    const renderGenerateReportBlock = () => {
        return (
            <Form
                className='wallet-reports__generate-report-block'
                layout="vertical"
                initialValues={initialFormValues}
                onFinish={handleGenerateReport}
            >
                <Form.Item noStyle>
                    <Row gutter={10}>
                        <Col span={24} sm={18}>
                            <Form.Item className='wallet-reports__range' label="Период" name="period">
                                <DatePicker.RangePicker
                                    className='wallet-reports__range-input'
                                    allowEmpty={[true, true]}
                                    format={'DD.MM.YYYY'}
                                    placeholder={['Начальная дата', 'Конечная дата']}
                                    onChange={handlePeriodChange}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24} sm={6}>
                            <Form.Item className='wallet-reports__operation-type' label="Тип операции" name="type">
                                <Select
                                    className='wallet-reports__operation-type-select'
                                    value={selectedOperationType}
                                    placeholder={'Тип операции'}
                                    onChange={setSelectedOperationType}
                                >
                                    <Select.Option value={null}>Все</Select.Option>
                                    <Select.Option value='EXPENSE'>Расход</Select.Option>
                                    <Select.Option value='INCOME'>Доход</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form.Item>

                <Form.Item className='wallet-reports__users' label="Пользователи" name="users">
                    <Select
                        className='wallet-reports__users-select'
                        value={selectedUsers}
                        mode='multiple'
                        placeholder={'По умолчанию - Все'}
                        notFoundContent={null}
                        onChange={setSelectedUsers}
                    >
                        {walletUsers.map(user => (
                            <Select.Option key={user?.id} value={user?.id}>
                                {user?.displayName}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item className='wallet-reports__buttons' noStyle>
                    <Row gutter={10} className='wallet-reports__buttons-row'>
                        {!!generatedReport && (
                            <Col span={12}>
                                <Form.Item noStyle>
                                    <Button
                                        className='wallet-reports__print-button'
                                        type='dashed'
                                        onClick={handlePrint}
                                    >
                                        Распечатать
                                    </Button>
                                </Form.Item>
                            </Col>
                        )}
                        <Col span={!!generatedReport ? 12 : 24}>
                            <Form.Item noStyle>
                                <Button
                                    className='wallet-reports__create-button'
                                    htmlType='submit'
                                    loading={isReportGenerating}
                                    type='primary'
                                >
                                    Создать отчет
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
        );
    };
    
    const renderDivider = (text) => {
        return (
            <Divider type='horizontal' className='wallet-reports__divider'>
                <Typography.Title level={2} className='wallet-reports__divider-text'>
                    {text}
                </Typography.Title>
            </Divider>
        );
    };

    const renderForm = () => {
        return (
            <Row id='wallet-reports' className='wallet-reports'>
                <Col span={24} lg={18} xl={14}>
                    <Row className='wallet-reports__title-row'>
                        <Col span={24}>
                            <Typography.Title className='wallet-reports__title'>Отчеты</Typography.Title>
                        </Col>
                    </Row>
                    <Row gutter={[10, 15]}>
                        <Col span={24}>{renderGenerateReportBlock()}</Col>
                        {!!generatedReport && (
                            <>
                                <Col span={24}>{renderDivider('Транзакции')}</Col>
                                <Col span={24}>{renderTransactionsBlock()}</Col>
                                <Col span={24}>{renderDivider('Категории')}</Col>
                                <Col span={24}>{renderCategoriesBlock()}</Col>
                                {!!generatedReport.tags && (
                                    <>
                                        <Col span={24}>{renderDivider('Теги')}</Col>
                                        <Col span={24}>{renderTagsBlock()}</Col>
                                    </>
                                )}
                            </>
                        )}
                    </Row>
                </Col>
            </Row>
        );
    };

    return renderForm();
};

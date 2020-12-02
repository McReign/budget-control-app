import './Categories.scss';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Card,
    Col,
    Row,
    Typography,
    Empty,
    message,
    Button,
    Input,
    Tabs, Select,
} from 'antd';
import { ERROR_MESSAGE_DURATION, SUCCESS_MESSAGE_DURATION } from '../../../../constants/errors';
import { addCategoryLoadingSelector, categoriesSelector } from '../../../../store/modules/categories/selectors';
import {
    expenseCategoriesEnhancer,
    incomeCategoriesEnhancer
} from '../../../../store/modules/categories/selectorEnhancers';
import { addCategory } from '../../../../store/modules/categories/thunks';
import { handleErrors } from '../../../../utils/handleErrors';

const ADD_CATEGORY_SUCCESS_MESSAGE = 'Категория добавлена!';

export const Categories = () => {
    const dispatch = useDispatch();

    const [categoryName, setCategoryName] = useState(null);
    const [categoryType, setCategoryType] = useState('EXPENSE');

    const isAddCategoryLoading = useSelector(addCategoryLoadingSelector);
    const categories = useSelector(categoriesSelector);
    const expenseCategories = expenseCategoriesEnhancer(categories);
    const incomeCategories = incomeCategoriesEnhancer(categories);

    const handleAddCategory = () => {
        if (!categoryName) return;
        dispatch(addCategory({ displayName: categoryName, type: categoryType }))
            .then(() => {
                message.success(ADD_CATEGORY_SUCCESS_MESSAGE, SUCCESS_MESSAGE_DURATION);
                setCategoryName(null);
            })
            .catch(handleErrors(message));
    };

    const handleCategoryNameChange = (e) => {
        e.persist();
        setCategoryName(e?.target?.value);
    };

    const handleCategoryTypeChange = (type) => {
        setCategoryType(type);
    };

    const renderAddCategoryBlock = () => {
        return (
            <Row gutter={10}>
                <Col className='user-categories__category-name-input-cell'>
                    <Input
                        className='user-categories__category-name-input'
                        value={categoryName}
                        placeholder="Название категории..."
                        onChange={handleCategoryNameChange}
                        onPressEnter={handleAddCategory}
                    />
                </Col>
                <Col>
                    <Select
                        className='user-categories__category-type-select'
                        value={categoryType}
                        placeholder={'Тип операции...'}
                        onChange={handleCategoryTypeChange}
                    >
                        <Select.Option value='EXPENSE'>Расход</Select.Option>
                        <Select.Option value='INCOME'>Доход</Select.Option>
                    </Select>
                </Col>
                <Col>
                    <Button
                        className={'user-categories__add-category-button'}
                        type="primary"
                        loading={isAddCategoryLoading}
                        onClick={handleAddCategory}
                    >
                        Добавить
                    </Button>
                </Col>
            </Row>
        );
    };

    const renderCategoriesList = () => {
        const tabs = [
            {
                key: 'EXPENSE',
                name: 'Расходы',
                categories: expenseCategories,
            },
            {
                key: 'INCOME',
                name: 'Доходы',
                categories: incomeCategories,
            },
        ];

        return (
            <Tabs defaultActiveKey='EXPENSE' onChange={handleCategoryTypeChange}>
                {tabs.map(({ key, name, categories }) => (
                    <Tabs.TabPane tab={name} key={key}>
                        {categories?.length ? categories.map(({ slug, displayName, type }) => (
                            <Card key={slug} hoverable size='small'>
                                <Row justify='space-between'>
                                    <Col>
                                        <Typography.Text>{displayName}</Typography.Text>
                                    </Col>
                                    <Col>
                                        <Typography.Text type={type === 'INCOME' ? 'success' : 'danger'}>
                                            {type === 'INCOME' ? 'Доход' : 'Расход'}
                                        </Typography.Text>
                                    </Col>
                                </Row>
                            </Card>
                        )) : (
                            <Empty description='Список пуст' />
                        )}
                    </Tabs.TabPane>
                ))}
            </Tabs>
        );
    };

    const renderForm = () => {
        return (
            <Row className='user-categories'>
                <Col span={16}>
                    <Row>
                        <Col span={24}>
                            <Typography.Title>Категории</Typography.Title>
                        </Col>
                    </Row>
                    <Row gutter={[10, 15]}>
                        <Col span={18}>{renderAddCategoryBlock()}</Col>
                        <Col span={18}>{renderCategoriesList()}</Col>
                    </Row>
                </Col>
            </Row>
        );
    };

    return renderForm();
};

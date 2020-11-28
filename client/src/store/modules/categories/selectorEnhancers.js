export const incomeCategoriesEnhancer = (categories) => {
    return categories.filter(category => category.type === 'INCOME');
};

export const expenseCategoriesEnhancer = (categories) => {
    return categories.filter(category => category.type === 'EXPENSE');
};

export const incomeCategoriesEnhancer = (categories) => {
    return categories.filter(category => category?.type === 'INCOME');
};

export const expenseCategoriesEnhancer = (categories) => {
    return categories.filter(category => category?.type === 'EXPENSE');
};

export const categoryEnhancer = (categories) => (slug) => {
    return categories.find(category => category?.slug === slug);
};
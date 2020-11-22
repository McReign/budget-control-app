export const errorsSelector = (state) => {
    return state.categoriesState.error;
};

export const isLoadingSelector = (state) => {
    return state.categoriesState.loading;
};

export const categoriesSelector = (state) => {
    return state.categoriesState.categories || [];
};

export const incomeCategoriesSelector = (state) => {
    return categoriesSelector(state).filter(category => category.type === 'INCOME');
};

export const expenseCategoriesSelector = (state) => {
    return categoriesSelector(state).filter(category => category.type === 'EXPENSE');
};

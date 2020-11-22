export const errorsSelector = (state) => {
    return state.categoriesState.error;
};

export const isLoadingSelector = (state) => {
    return state.categoriesState.loading;
};

export const categoriesSelector = (state) => {
    return state.categoriesState.categories;
};

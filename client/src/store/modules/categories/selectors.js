export const categoriesErrorsSelector = (state) => {
    return state.categoriesState.categories.error;
};

export const categoriesLoadingSelector = (state) => {
    return state.categoriesState.categories.loading;
};

export const addCategoryErrorsSelector = (state) => {
    return state.categoriesState.addCategory.error;
};

export const addCategoryLoadingSelector = (state) => {
    return state.categoriesState.addCategory.loading;
};

export const categoriesSelector = (state) => {
    return state.categoriesState.categories.list || [];
};

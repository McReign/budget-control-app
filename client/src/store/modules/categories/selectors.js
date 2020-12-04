export const personalCategoriesErrorsSelector = (state) => {
    return state.categoriesState.personalCategories.error;
};

export const personalCategoriesLoadingSelector = (state) => {
    return state.categoriesState.personalCategories.loading;
};

export const addCategoryErrorsSelector = (state) => {
    return state.categoriesState.addCategory.error;
};

export const addCategoryLoadingSelector = (state) => {
    return state.categoriesState.addCategory.loading;
};

export const personalCategoriesSelector = (state) => {
    return state.categoriesState.personalCategories.list || [];
};

export const walletCategoriesErrorsSelector = (state) => {
    return state.categoriesState.walletCategories.error;
};

export const walletCategoriesLoadingSelector = (state) => {
    return state.categoriesState.walletCategories.loading;
};

export const walletCategoriesSelector = (state) => {
    return state.categoriesState.walletCategories.list || [];
};

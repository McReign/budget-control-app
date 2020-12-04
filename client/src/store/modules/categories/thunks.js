import {
    getPersonalCategoriesError,
    getPersonalCategoriesStart,
    getPersonalCategoriesSuccess,
    getWalletCategoriesError,
    getWalletCategoriesStart,
    getWalletCategoriesSuccess,
    addCategoryError,
    addCategoryStart,
    addCategorySuccess,
} from './actions';
import { getCategoriesRequest, addCategoryRequest } from '../../../api/categories';

export const getPersonalCategories = () => {
    return dispatch => {
        dispatch(getPersonalCategoriesStart());

        return getCategoriesRequest()
            .then(res => {
                const categories = res?.data?.data?.categories;
                dispatch(getPersonalCategoriesSuccess(categories));
                return Promise.resolve(categories);
            })
            .catch(err => {
                const errors = err?.response?.data?.errors;
                dispatch(getPersonalCategoriesError(errors));
                return Promise.reject(errors);
            });
    };
};

export const getWalletCategories = (walletId) => {
    return dispatch => {
        dispatch(getWalletCategoriesStart());

        return getCategoriesRequest({ walletId })
            .then(res => {
                const categories = res?.data?.data?.categories;
                dispatch(getWalletCategoriesSuccess(categories));
                return Promise.resolve(categories);
            })
            .catch(err => {
                const errors = err?.response?.data?.errors;
                dispatch(getWalletCategoriesError(errors));
                return Promise.reject(errors);
            });
    };
};

export const addCategory = (category) => {
    return dispatch => {
        dispatch(addCategoryStart());

        return addCategoryRequest(category)
            .then(res => {
                const addedCategory = res?.data?.data?.category;
                dispatch(addCategorySuccess(addedCategory));
                return Promise.resolve(addedCategory);
            })
            .catch(err => {
                const errors = err?.response?.data?.errors;
                dispatch(addCategoryError(errors));
                return Promise.reject(errors);
            });
    };
};

import {
    GET_PERSONAL_CATEGORIES_ERROR,
    GET_PERSONAL_CATEGORIES_START,
    GET_PERSONAL_CATEGORIES_SUCCESS,
    GET_WALLET_CATEGORIES_ERROR,
    GET_WALLET_CATEGORIES_START,
    GET_WALLET_CATEGORIES_SUCCESS,
    ADD_CATEGORY_ERROR,
    ADD_CATEGORY_START,
    ADD_CATEGORY_SUCCESS,
} from './constants';

export const getPersonalCategoriesStart = () => ({
    type: GET_PERSONAL_CATEGORIES_START,
});

export const getPersonalCategoriesSuccess = (categories) => ({
    type: GET_PERSONAL_CATEGORIES_SUCCESS,
    payload: categories,
});

export const getPersonalCategoriesError = (error) => ({
    type: GET_PERSONAL_CATEGORIES_ERROR,
    payload: error,
});

export const getWalletCategoriesStart = () => ({
    type: GET_WALLET_CATEGORIES_START,
});

export const getWalletCategoriesSuccess = (categories) => ({
    type: GET_WALLET_CATEGORIES_SUCCESS,
    payload: categories,
});

export const getWalletCategoriesError = (error) => ({
    type: GET_WALLET_CATEGORIES_ERROR,
    payload: error,
});

export const addCategoryStart = () => ({
    type: ADD_CATEGORY_START,
});

export const addCategorySuccess = (category) => ({
    type: ADD_CATEGORY_SUCCESS,
    payload: category,
});

export const addCategoryError = (error) => ({
    type: ADD_CATEGORY_ERROR,
    payload: error,
});
import {
    GET_CATEGORIES_ERROR,
    GET_CATEGORIES_START,
    GET_CATEGORIES_SUCCESS,
} from './constants';

export const getCategoriesStart = () => ({
    type: GET_CATEGORIES_START,
});

export const getCategoriesSuccess = (categories) => ({
    type: GET_CATEGORIES_SUCCESS,
    payload: categories,
});

export const getCategoriesError = (error) => ({
    type: GET_CATEGORIES_ERROR,
    payload: error,
});

import {
    GET_CATEGORIES_ERROR,
    GET_CATEGORIES_START,
    GET_CATEGORIES_SUCCESS,
    ADD_CATEGORY_ERROR,
    ADD_CATEGORY_START,
    ADD_CATEGORY_SUCCESS,
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
import {
    getCategoriesError,
    getCategoriesStart,
    getCategoriesSuccess,
    addCategoryError,
    addCategoryStart,
    addCategorySuccess,
} from './actions';
import { getCategoriesRequest, addCategoryRequest } from '../../../api/categories';

export const getCategories = () => {
    return dispatch => {
        dispatch(getCategoriesStart());

        return getCategoriesRequest()
            .then(res => {
                const categories = res?.data?.data?.categories;
                dispatch(getCategoriesSuccess(categories));
                return Promise.resolve(categories);
            })
            .catch(err => {
                const errors = err?.response?.data?.errors;
                dispatch(getCategoriesError(errors));
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

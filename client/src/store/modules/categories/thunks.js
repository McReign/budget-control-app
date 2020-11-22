import {
    getCategoriesError,
    getCategoriesStart,
    getCategoriesSuccess,
} from './actions';
import { getCategoriesRequest } from '../../../api/categories';

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

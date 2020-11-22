import {
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_START,
    GET_CATEGORIES_ERROR,
} from './constants';

const initialState = {
    categories: null,
    loading: false,
    error: null,
};

export const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORIES_START:
            return { ...state, loading: true, error: null };
        case GET_CATEGORIES_SUCCESS:
            return { ...state, loading: false, categories: action.payload };
        case GET_CATEGORIES_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

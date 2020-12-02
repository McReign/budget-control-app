import {
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_START,
    GET_CATEGORIES_ERROR,
    ADD_CATEGORY_ERROR,
    ADD_CATEGORY_SUCCESS,
    ADD_CATEGORY_START,
} from './constants';

const initialState = {
    categories: {
        list: null,
        loading: false,
        error: null,
    },
    addCategory: {
        loading: false,
        error: null,
    },
};

export const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORIES_START:
            return {
                ...state,
                categories: {
                    ...state.categories,
                    loading: true,
                    error: null,
                },
            };
        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: {
                    loading: false,
                    error: null,
                    list: action.payload,
                }
            };
        case GET_CATEGORIES_ERROR:
            return {
                ...state,
                categories: {
                    loading: false,
                    error: action.payload,
                },
            };
        case ADD_CATEGORY_START:
            return {
                ...state,
                addCategory: {
                    ...state.addCategory,
                    loading: true,
                    error: null,
                },
            };
        case ADD_CATEGORY_SUCCESS:
            return {
                ...state,
                addCategory: {
                    ...state.addCategory,
                    loading: false,
                    error: null,
                },
                categories: {
                    ...state.categories,
                    list: [...state.categories.list, action.payload],
                }
            };
        case ADD_CATEGORY_ERROR:
            return {
                ...state,
                addCategory: {
                    loading: false,
                    error: action.payload,
                },
            };
        default:
            return state;
    }
};

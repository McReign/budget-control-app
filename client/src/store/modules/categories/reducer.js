import {
    GET_WALLET_CATEGORIES_SUCCESS,
    GET_WALLET_CATEGORIES_START,
    GET_WALLET_CATEGORIES_ERROR,
    GET_PERSONAL_CATEGORIES_SUCCESS,
    GET_PERSONAL_CATEGORIES_START,
    GET_PERSONAL_CATEGORIES_ERROR,
    ADD_CATEGORY_ERROR,
    ADD_CATEGORY_SUCCESS,
    ADD_CATEGORY_START,
} from './constants';

const initialState = {
    personalCategories: {
        list: null,
        loading: false,
        error: null,
    },
    walletCategories: {
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
        case GET_PERSONAL_CATEGORIES_START:
            return {
                ...state,
                personalCategories: {
                    ...state.personalCategories,
                    loading: true,
                    error: null,
                },
            };
        case GET_PERSONAL_CATEGORIES_SUCCESS:
            return {
                ...state,
                personalCategories: {
                    ...state.personalCategories,
                    loading: false,
                    error: null,
                    list: action.payload,
                }
            };
        case GET_PERSONAL_CATEGORIES_ERROR:
            return {
                ...state,
                personalCategories: {
                    ...state.personalCategories,
                    loading: false,
                    error: action.payload,
                },
            };
        case GET_WALLET_CATEGORIES_START:
            return {
                ...state,
                walletCategories: {
                    ...state.walletCategories,
                    loading: true,
                    error: null,
                },
            };
        case GET_WALLET_CATEGORIES_SUCCESS:
            return {
                ...state,
                walletCategories: {
                    ...state.walletCategories,
                    loading: false,
                    error: null,
                    list: action.payload,
                }
            };
        case GET_WALLET_CATEGORIES_ERROR:
            return {
                ...state,
                walletCategories: {
                    ...state.walletCategories,
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
                personalCategories: {
                    ...state.personalCategories,
                    list: [...(state.personalCategories.list || []), action.payload],
                },
                walletCategories: {
                    ...state.walletCategories,
                    list: [...(state.walletCategories.list || []), action.payload],
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

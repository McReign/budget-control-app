import {
    LOGIN_USER_START,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    GET_USER_START,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    LOGOUT_USER_START,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_ERROR,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    REGISTER_USER_START,
} from './constants';

const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER_START:
        case GET_USER_START:
        case LOGOUT_USER_START:
        case REGISTER_USER_START:
            return { ...state, loading: true, error: null };
        case LOGIN_USER_SUCCESS:
        case REGISTER_USER_SUCCESS:
            return { ...state, loading: false, token: action.payload };
        case GET_USER_SUCCESS:
            return { ...state, loading: false, user: action.payload };
        case LOGOUT_USER_SUCCESS:
            return { ...state, loading: false, user: null, token: null };
        case LOGIN_USER_ERROR:
        case GET_USER_ERROR:
        case LOGOUT_USER_ERROR:
        case REGISTER_USER_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

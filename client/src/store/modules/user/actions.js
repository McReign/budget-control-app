import {
    LOGIN_USER_START,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    LOGOUT_USER_ERROR,
    LOGOUT_USER_START,
    LOGOUT_USER_SUCCESS,
    GET_USER_ERROR,
    GET_USER_START,
    GET_USER_SUCCESS,
    REGISTER_USER_ERROR,
    REGISTER_USER_START,
    REGISTER_USER_SUCCESS,
} from './constants';

export const loginUserStart = (data) => ({
    type: LOGIN_USER_START,
    payload: data,
});

export const loginUserSuccess = (token) => ({
    type: LOGIN_USER_SUCCESS,
    payload: token,
});

export const loginUserError = (error) => ({
    type: LOGIN_USER_ERROR,
    payload: error,
});

export const logoutUserStart = () => ({
    type: LOGOUT_USER_START,
});

export const logoutUserSuccess = () => ({
    type: LOGOUT_USER_SUCCESS,
});

export const logoutUserError = (error) => ({
    type: LOGOUT_USER_ERROR,
    payload: error,
});

export const registerUserStart = (data) => ({
    type: REGISTER_USER_START,
    payload: data,
});

export const registerUserSuccess = (token) => ({
    type: REGISTER_USER_SUCCESS,
    payload: token,
});

export const registerUserError = (error) => ({
    type: REGISTER_USER_ERROR,
    payload: error,
});

export const getUserStart = () => ({
    type: GET_USER_START,
});

export const getUserSuccess = (user) => ({
    type: GET_USER_SUCCESS,
    payload: user,
});

export const getUserError = (error) => ({
    type: GET_USER_ERROR,
    payload: error,
});

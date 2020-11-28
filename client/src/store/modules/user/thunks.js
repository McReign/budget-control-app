import {
    loginUserError,
    loginUserStart,
    loginUserSuccess,
    getUserError,
    getUserStart,
    getUserSuccess,
    logoutUserError,
    logoutUserStart,
    logoutUserSuccess,
    getNotificationsError,
    getNotificationsStart,
    getNotificationsSuccess,
    registerUserError,
    registerUserStart,
    registerUserSuccess,
} from './actions';
import { loginRequest, getMeRequest, logoutRequest, registerRequest } from '../../../api/users';
import { setAuthorizationToken } from '../../../utils/authorization/setAuthorizationToken';
import { clearAuthorizationToken } from '../../../utils/authorization/clearAuthorizationToken';
import { getNotificationsRequest } from '../../../api/notifications';

export const loginUser = (email, password, remember) => {
    return dispatch => {
        dispatch(loginUserStart({ email, password }));

        return loginRequest(email, password)
            .then(res => {
                const token = res?.data?.data?.token;
                setAuthorizationToken(token, remember);
                dispatch(loginUserSuccess(token));
                return Promise.resolve(token);
            })
            .catch(err => {
                const errors = err?.response?.data?.errors;
                dispatch(loginUserError(errors));
                return Promise.reject(errors);
            });
    };
};

export const registerUser = (email, displayName, password) => {
    return dispatch => {
        dispatch(registerUserStart({ email, displayName, password }));

        return registerRequest(email, displayName, password)
            .then(res => {
                const token = res?.data?.data?.token;
                setAuthorizationToken(token, true);
                dispatch(registerUserSuccess(token));
                return Promise.resolve(token);
            })
            .catch(err => {
                const errors = err?.response?.data?.errors;
                dispatch(registerUserError(errors));
                return Promise.reject(errors);
            });
    };
};

export const logoutUser = () => {
    return dispatch => {
        dispatch(logoutUserStart());

        return logoutRequest()
            .then(() => {
                clearAuthorizationToken();
                dispatch(logoutUserSuccess());
                return Promise.resolve();
            })
            .catch(err => {
                const errors = err?.response?.data?.errors;
                dispatch(logoutUserError(errors));
                return Promise.reject(errors);
            });
    };
};

export const getUser = () => {
    return dispatch => {
        dispatch(getUserStart());

        return getMeRequest()
            .then(res => {
                const user = res?.data?.data;
                dispatch(getUserSuccess(user));
                return Promise.resolve(user);
            })
            .catch(err => {
                const errors = err?.response?.data?.errors;
                dispatch(getUserError(errors));
                return Promise.reject(errors);
            });
    };
};

export const getNotifications = () => {
    return dispatch => {
        dispatch(getNotificationsStart());

        return getNotificationsRequest()
            .then(res => {
                const notifications = res?.data?.data?.notifications;
                dispatch(getNotificationsSuccess(notifications));
                return Promise.resolve(notifications);
            })
            .catch(err => {
                const errors = err?.response?.data?.errors;
                dispatch(getNotificationsError(errors));
                return Promise.reject(errors);
            });
    };
};
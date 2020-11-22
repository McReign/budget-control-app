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
} from './actions';
import { loginRequest, getMeRequest, logoutRequest } from '../../../api/users';
import { setAuthorizationToken } from '../../../utils/setAuthorizationToken';
import { clearAuthorizationToken } from '../../../utils/clearAuthorizationToken';

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

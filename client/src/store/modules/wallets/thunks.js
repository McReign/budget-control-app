import {
    getWalletsError,
    getWalletsStart,
    getWalletsSuccess,
    getWalletOperationsError,
    getWalletOperationsStart,
    getWalletOperationsSuccess,
    addOperationError,
    addOperationStart,
    addOperationSuccess,
    inviteUserError,
    inviteUserStart,
    inviteUserSuccess,
} from './actions';
import { getWalletsRequest, getWalletOperationsRequest, inviteUserRequest } from '../../../api/wallets';
import { addOperationRequest } from '../../../api/operations';

export const getWallets = () => {
    return dispatch => {
        dispatch(getWalletsStart());

        return getWalletsRequest()
            .then(res => {
                const wallets = res?.data?.data?.wallets;
                dispatch(getWalletsSuccess(wallets));
                return Promise.resolve(wallets);
            })
            .catch(err => {
                const errors = err?.response?.data?.errors;
                dispatch(getWalletsError(errors));
                return Promise.reject(errors);
            });
    };
};

export const getWalletOperations = (walletId) => {
    return dispatch => {
        dispatch(getWalletOperationsStart(walletId));

        return getWalletOperationsRequest(walletId)
            .then(res => {
                const operations = res?.data?.data?.operations;
                dispatch(getWalletOperationsSuccess(walletId, operations));
                return Promise.resolve(operations);
            })
            .catch(err => {
                const errors = err?.response?.data?.errors;
                dispatch(getWalletOperationsError(errors));
                return Promise.reject(errors);
            });
    };
};

export const addOperation = (walletId, operation) => {
    return dispatch => {
        dispatch(addOperationStart(walletId, operation));

        return addOperationRequest(walletId, operation)
            .then(res => {
                const operation = res?.data?.data?.operation;
                dispatch(addOperationSuccess(walletId, operation));
                return Promise.resolve(operation);
            })
            .catch(err => {
                const errors = err?.response?.data?.errors;
                dispatch(addOperationError(errors));
                return Promise.reject(errors);
            });
    };
};

export const inviteUser = (walletId, toUserId) => {
    return dispatch => {
        dispatch(inviteUserStart(walletId, toUserId));

        return inviteUserRequest(walletId, toUserId)
            .then(res => {
                const invitation = res?.data?.data?.invitation;
                dispatch(inviteUserSuccess(walletId, invitation));
                return Promise.resolve(invitation);
            })
            .catch(err => {
                const errors = err?.response?.data?.errors;
                dispatch(inviteUserError(errors));
                return Promise.reject(errors);
            });
    };
};
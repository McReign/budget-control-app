import {
    GET_WALLETS_ERROR,
    GET_WALLETS_START,
    GET_WALLETS_SUCCESS,
    GET_WALLET_OPERATIONS_ERROR,
    GET_WALLET_OPERATIONS_START,
    GET_WALLET_OPERATIONS_SUCCESS,
    ADD_OPERATION_ERROR,
    ADD_OPERATION_START,
    ADD_OPERATION_SUCCESS,
} from './constants';

export const getWalletsStart = () => ({
    type: GET_WALLETS_START,
});

export const getWalletsSuccess = (wallets) => ({
    type: GET_WALLETS_SUCCESS,
    payload: wallets,
});

export const getWalletsError = (error) => ({
    type: GET_WALLETS_ERROR,
    payload: error,
});

export const getWalletOperationsStart = (walletId) => ({
    type: GET_WALLET_OPERATIONS_START,
    payload: walletId,
});

export const getWalletOperationsSuccess = (walletId, operations) => ({
    type: GET_WALLET_OPERATIONS_SUCCESS,
    payload: { walletId, operations },
});

export const getWalletOperationsError = (error) => ({
    type: GET_WALLET_OPERATIONS_ERROR,
    payload: error,
});

export const addOperationStart = (walletId, operation) => ({
    type: ADD_OPERATION_START,
    payload: operation,
});

export const addOperationSuccess = (walletId, operation) => ({
    type: ADD_OPERATION_SUCCESS,
    payload: { walletId, operation },
});

export const addOperationError = (error) => ({
    type: ADD_OPERATION_ERROR,
    payload: error,
});
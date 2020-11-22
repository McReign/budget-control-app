import {
    GET_WALLETS_SUCCESS,
    GET_WALLETS_START,
    GET_WALLETS_ERROR,
    GET_WALLET_OPERATIONS_SUCCESS,
    GET_WALLET_OPERATIONS_ERROR,
    GET_WALLET_OPERATIONS_START,
    ADD_OPERATION_ERROR,
    ADD_OPERATION_SUCCESS,
    ADD_OPERATION_START,
} from './constants';

const initialState = {
    wallets: null,
    operations: null,
    loading: false,
    error: null,
};

export const walletsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_WALLETS_START:
        case ADD_OPERATION_START:
            return { ...state, loading: true, error: null };
        case GET_WALLET_OPERATIONS_START:
            return {
                ...state,
                loading: true,
                error: null,
                operations: {
                    ...state.operations,
                    [action.payload]: null,
                },
            };
        case GET_WALLETS_SUCCESS:
            return { ...state, loading: false, wallets: action.payload };
        case GET_WALLET_OPERATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                operations: {
                    ...state.operations,
                    [action.payload.walletId]: action.payload.operations,
                },
            };
        case ADD_OPERATION_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                operations: {
                    ...state.operations,
                    [action.payload.walletId]: [
                        ...state.operations[action.payload.walletId],
                        action.payload.operation,
                    ],
                },
                wallets: state.wallets.map(wallet => (wallet.id === action.payload.walletId ?
                    { ...wallet, balance: action.payload.operation.wallet.balance }
                    : wallet
                )),
            };
        case GET_WALLETS_ERROR:
        case GET_WALLET_OPERATIONS_ERROR:
        case ADD_OPERATION_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

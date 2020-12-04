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
    INVITE_USER_SUCCESS,
    INVITE_USER_ERROR,
    INVITE_USER_START,
} from './constants';

const initialState = {
    wallets: null,
    operations: null,
    loading: false,
    inviteLoading: false,
    error: null,
    inviteError: null,
};

export const walletsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_WALLETS_START:
            return { ...state, error: null };
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
        case INVITE_USER_START:
            return { ...state, inviteLoading: true, inviteError: null };
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
        case INVITE_USER_SUCCESS:
            return { ...state, inviteLoading: false, inviteError: null };
        case GET_WALLETS_ERROR:
            return { ...state, error: action.payload };
        case GET_WALLET_OPERATIONS_ERROR:
        case ADD_OPERATION_ERROR:
            return { ...state, loading: false, error: action.payload };
        case INVITE_USER_ERROR:
            return { ...state, inviteLoading: false, inviteError: action.payload };
        default:
            return state;
    }
};

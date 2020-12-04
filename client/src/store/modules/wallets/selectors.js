export const errorsSelector = (state) => {
    return state.walletsState.error;
};

export const isLoadingSelector = (state) => {
    return state.walletsState.loading;
};

export const inviteErrorsSelector = (state) => {
    return state.walletsState.inviteError;
};

export const isInviteLoadingSelector = (state) => {
    return state.walletsState.inviteLoading;
};

export const walletsSelector = (state) => {
    return state.walletsState.wallets || [];
};

export const walletOperationsSelector = (state) => (walletId) => {
    return state.walletsState.operations?.[walletId] || [];
};

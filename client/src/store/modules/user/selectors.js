export const errorsSelector = (state) => {
    return state.userState.error;
};

export const isLoadingSelector = (state) => {
    return state.userState.loading;
};

export const userSelector = (state) => {
    return state.userState.user;
};

export const notificationsSelector = (state) => {
    return state.userState.notifications || [];
};

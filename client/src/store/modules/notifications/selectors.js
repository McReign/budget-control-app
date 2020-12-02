export const notificationsErrorSelector = (state) => {
    return state.notificationsState.notifications.error;
};

export const notificationsLoadingSelector = (state) => {
    return state.notificationsState.notifications.loading;
};

export const notificationsListSelector = (state) => {
    return state.notificationsState.notifications.list || [];
};

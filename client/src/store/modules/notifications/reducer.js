import {
    GET_NOTIFICATIONS_ERROR,
    GET_NOTIFICATIONS_SUCCESS,
    GET_NOTIFICATIONS_START,
    ACCEPT_INVITATION_ERROR,
    ACCEPT_INVITATION_SUCCESS,
    ACCEPT_INVITATION_START,
    CANCEL_INVITATION_ERROR,
    CANCEL_INVITATION_SUCCESS,
    CANCEL_INVITATION_START,
} from './constants';

const initialState = {
    notifications: {
        list: null,
        loading: false,
        error: null,
    },
    invitation: {
        loading: false,
        error: null,
    }
};

export const notificationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_NOTIFICATIONS_START:
            return {
                ...state,
                notifications: {
                    ...state.notifications,
                    loading: true,
                    error: null,
                },
            };
        case GET_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                notifications: {
                    ...state.notifications,
                    loading: false,
                    error: null,
                    list: action.payload,
                }
            };
        case GET_NOTIFICATIONS_ERROR:
            return {
                ...state,
                notifications: {
                    loading: false,
                    error: action.payload,
                },
            };
        case ACCEPT_INVITATION_START:
        case CANCEL_INVITATION_START:
            return {
                ...state,
                invitation: {
                    ...state.invitation,
                    loading: true,
                    error: null,
                },
            };
        case ACCEPT_INVITATION_SUCCESS:
        case CANCEL_INVITATION_SUCCESS:
            return {
                ...state,
                invitation: {
                    ...state.invitation,
                    loading: false,
                    error: null,
                }
            };
        case ACCEPT_INVITATION_ERROR:
        case CANCEL_INVITATION_ERROR:
            return {
                ...state,
                invitation: {
                    loading: false,
                    error: action.payload,
                },
            };
        default:
            return state;
    }
};

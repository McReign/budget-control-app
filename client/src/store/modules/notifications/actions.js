import {
    GET_NOTIFICATIONS_ERROR,
    GET_NOTIFICATIONS_START,
    GET_NOTIFICATIONS_SUCCESS,
    ACCEPT_INVITATION_ERROR,
    ACCEPT_INVITATION_START,
    ACCEPT_INVITATION_SUCCESS,
    CANCEL_INVITATION_ERROR,
    CANCEL_INVITATION_START,
    CANCEL_INVITATION_SUCCESS,
} from './constants';

export const getNotificationsStart = () => ({
    type: GET_NOTIFICATIONS_START,
});

export const getNotificationsSuccess = (notifications) => ({
    type: GET_NOTIFICATIONS_SUCCESS,
    payload: notifications,
});

export const getNotificationsError = (error) => ({
    type: GET_NOTIFICATIONS_ERROR,
    payload: error,
});

export const acceptInvitationStart = () => ({
    type: ACCEPT_INVITATION_START,
});

export const acceptInvitationSuccess = () => ({
    type: ACCEPT_INVITATION_SUCCESS,
});

export const acceptInvitationError = (error) => ({
    type: ACCEPT_INVITATION_ERROR,
    payload: error,
});

export const cancelInvitationStart = () => ({
    type: CANCEL_INVITATION_START,
});

export const cancelInvitationSuccess = () => ({
    type: CANCEL_INVITATION_SUCCESS,
});

export const cancelInvitationError = (error) => ({
    type: CANCEL_INVITATION_ERROR,
    payload: error,
});

import {
    getNotificationsError,
    getNotificationsStart,
    getNotificationsSuccess,
    acceptInvitationError,
    acceptInvitationStart,
    acceptInvitationSuccess,
    cancelInvitationError,
    cancelInvitationStart,
    cancelInvitationSuccess,
} from './actions';
import { getNotificationsRequest } from '../../../api/notifications';
import { acceptInvitationRequest, cancelInvitationRequest } from '../../../api/invitations';

export const getNotifications = () => {
    return dispatch => {
        dispatch(getNotificationsStart());

        return getNotificationsRequest()
            .then(res => {
                const notifications = res?.data?.data?.notifications;
                dispatch(getNotificationsSuccess(notifications));
                return Promise.resolve(notifications);
            })
            .catch(err => {
                const errors = err?.response?.data?.errors;
                dispatch(getNotificationsError(errors));
                return Promise.reject(errors);
            });
    };
};

export const acceptInvitation = (invitationId) => {
    return dispatch => {
        dispatch(acceptInvitationStart());

        return acceptInvitationRequest(invitationId)
            .then(() => {
                dispatch(acceptInvitationSuccess());
                return Promise.resolve();
            })
            .catch(err => {
                const errors = err?.response?.data?.errors;
                dispatch(acceptInvitationError(errors));
                return Promise.reject(errors);
            });
    };
};

export const cancelInvitation = (invitationId) => {
    return dispatch => {
        dispatch(cancelInvitationStart());

        return cancelInvitationRequest(invitationId)
            .then(() => {
                dispatch(cancelInvitationSuccess());
                return Promise.resolve();
            })
            .catch(err => {
                const errors = err?.response?.data?.errors;
                dispatch(cancelInvitationError(errors));
                return Promise.reject(errors);
            });
    };
};

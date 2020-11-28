import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { message } from 'antd';

import { acceptInvitationRequest, cancelInvitationRequest } from '../../../../api/invitations';
import { ERROR_MESSAGE_DURATION } from '../../../../constants/errors';
import { Invitation } from './Invitation';

export const InvitationWithStore = (props) => {
    const dispatch = useDispatch();

    const onCancel = useCallback((invitationId) => {
        return cancelInvitationRequest(invitationId)
            .catch(errors => message.error(errors?.common, ERROR_MESSAGE_DURATION));
    }, []);

    const onAccept = useCallback((invitationId) => {
        return acceptInvitationRequest(invitationId)
            .catch(errors => message.error(errors?.common, ERROR_MESSAGE_DURATION));
    }, []);

    return <Invitation {...props} onAccept={onAccept} onCancel={onCancel} />
};

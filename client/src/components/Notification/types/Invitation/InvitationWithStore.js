import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { message } from 'antd';

import { ERROR_MESSAGE_DURATION } from '../../../../constants/errors';
import { Invitation } from './Invitation';
import { acceptInvitation, cancelInvitation } from '../../../../store/modules/notifications/thunks';
import { getUserData } from '../../../../store/modules/user/thunks';

export const InvitationWithStore = (props) => {
    const dispatch = useDispatch();
    const [isAcceptLoading, setIsAcceptLoading] = useState(false);
    const [isCancelLoading, setIsCancelLoading] = useState(false);

    const onCancel = useCallback((invitationId) => {
        setIsCancelLoading(true);
        return dispatch(cancelInvitation(invitationId))
            .then(() => dispatch(getUserData()))
            .catch(errors => message.error(errors?.common, ERROR_MESSAGE_DURATION))
            .finally(() => setIsCancelLoading(false));
    }, []);

    const onAccept = useCallback((invitationId) => {
        setIsAcceptLoading(true);
        return dispatch(acceptInvitation(invitationId))
            .then(() => dispatch(getUserData()))
            .catch(errors => message.error(errors?.common, ERROR_MESSAGE_DURATION))
            .finally(() => setIsAcceptLoading(false));
    }, []);

    return (
        <Invitation
            {...props}
            isAcceptLoading={isAcceptLoading}
            isCancelLoading={isCancelLoading}
            onAccept={onAccept}
            onCancel={onCancel}
        />
    );
};

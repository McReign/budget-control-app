import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { message } from 'antd';

import { Invitation } from './Invitation';
import { acceptInvitation, cancelInvitation } from '../../../../store/modules/notifications/thunks';
import { getUserData } from '../../../../store/modules/user/thunks';
import { handleErrors } from '../../../../utils/handleErrors';

export const InvitationWithStore = (props) => {
    const dispatch = useDispatch();
    const [isAcceptLoading, setIsAcceptLoading] = useState(false);
    const [isCancelLoading, setIsCancelLoading] = useState(false);

    const onCancel = useCallback((invitationId) => {
        setIsCancelLoading(true);
        return dispatch(cancelInvitation(invitationId))
            .then(() => dispatch(getUserData()))
            .catch(handleErrors(message))
            .finally(() => setIsCancelLoading(false));
    }, []);

    const onAccept = useCallback((invitationId) => {
        setIsAcceptLoading(true);
        return dispatch(acceptInvitation(invitationId))
            .then(() => dispatch(getUserData()))
            .catch(handleErrors(message))
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

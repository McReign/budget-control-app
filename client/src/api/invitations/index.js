import { apiService } from '../../services/ApiService';
import { withAuthorizationToken } from '../../utils/withAuthorizationToken';

export const acceptInvitationRequest = (invitationId) => {
    return apiService.post(
        `/api/invitations/${invitationId}/accept`,
        null,
        {
            headers: withAuthorizationToken(),
        },
    );
};

export const cancelInvitationRequest = (invitationId) => {
    return apiService.post(
        `/api/invitations/${invitationId}/cancel`,
        null,
        {
            headers: withAuthorizationToken(),
        },
    );
};

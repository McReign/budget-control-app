import { apiService } from '../../services/ApiService';
import { withAuthorizationToken } from '../../utils/withAuthorizationToken';

export const getNotificationsRequest = () => {
    return apiService.get(
        '/api/notifications',
        null,
        {
            headers: withAuthorizationToken(),
        },
    );
};

export const closeNotificationRequest = (notificationId) => {
    return apiService.post(
        `/api/notifications/${notificationId}/close`,
        null,
        {
            headers: withAuthorizationToken(),
        },
    );
};

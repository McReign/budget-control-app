import { apiService } from '../../services/ApiService';
import { withAuthorizationToken } from '../../utils/withAuthorizationToken';

export const getMeRequest = () => {
    return apiService.get(
        '/api/users/me',
        null,
        {
            headers: withAuthorizationToken(),
        },
    );
};

export const loginRequest = (email, password) => {
    return apiService.post('/api/users/login', { email, password });
};

export const logoutRequest = () => {
    return apiService.post(
        '/api/users/logout',
        null,
        {
            headers: withAuthorizationToken(),
        },
    );
};

import { apiService } from '../../services/ApiService';
import { withAuthorizationToken } from '../../utils/authorization/withAuthorizationToken';

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

export const registerRequest = (email, displayName, password) => {
    return apiService.post('/api/users/register', { email, displayName, password });
};

export const getUsersRequest = (search) => {
    return apiService.get(
        '/api/users',
        { search },
        {
            headers: withAuthorizationToken(),
        },
    );
};

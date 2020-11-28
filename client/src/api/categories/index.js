import { apiService } from '../../services/ApiService';
import { withAuthorizationToken } from '../../utils/authorization/withAuthorizationToken';

export const getCategoriesRequest = () => {
    return apiService.get(
        '/api/categories',
        null,
        {
            headers: withAuthorizationToken(),
        },
    );
};

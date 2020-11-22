import { apiService } from '../../services/ApiService';
import { withAuthorizationToken } from '../../utils/withAuthorizationToken';

export const getCategoriesRequest = () => {
    return apiService.get(
        '/api/categories',
        null,
        {
            headers: withAuthorizationToken(),
        },
    );
};

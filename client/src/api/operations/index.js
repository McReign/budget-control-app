import { apiService } from '../../services/ApiService';
import { withAuthorizationToken } from '../../utils/withAuthorizationToken';

export const addOperationRequest = (walletId, { type, amount, date, category }) => {
    return apiService.post(
        `/api/wallets/${walletId}/operations`,
        {
            type,
            amount,
            date,
            categoryId: category?.id,
        },
        {
            headers: withAuthorizationToken(),
        },
    );
};

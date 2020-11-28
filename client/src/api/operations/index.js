import { apiService } from '../../services/ApiService';
import { withAuthorizationToken } from '../../utils/authorization/withAuthorizationToken';

export const addOperationRequest = (walletId, { type, amount, date, category, note }) => {
    return apiService.post(
        `/api/wallets/${walletId}/operations`,
        {
            type,
            amount,
            date,
            note,
            categoryId: category?.id,
        },
        {
            headers: withAuthorizationToken(),
        },
    );
};

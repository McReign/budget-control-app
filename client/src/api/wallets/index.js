import { apiService } from '../../services/ApiService';
import { withAuthorizationToken } from '../../utils/withAuthorizationToken';

export const getWalletsRequest = () => {
    return apiService.get(
        '/api/wallets',
        null,
        {
            headers: withAuthorizationToken(),
        },
    );
};

export const getWalletOperationsRequest = (walletId) => {
    return apiService.get(
        `/api/wallets/${walletId}/operations`,
        null,
        {
            headers: withAuthorizationToken(),
        },
    );
};

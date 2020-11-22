import { localStorageService, sessionStorageService } from '../services/StorageService';
import { AUTHORIZATION_TOKEN_NAME } from '../constants/authorization';

export const getAuthorizationToken = () => {
    return localStorageService.get(AUTHORIZATION_TOKEN_NAME) || sessionStorageService.get(AUTHORIZATION_TOKEN_NAME);
};

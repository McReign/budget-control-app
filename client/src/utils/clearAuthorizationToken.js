import { localStorageService, sessionStorageService } from '../services/StorageService';
import { AUTHORIZATION_TOKEN_NAME } from '../constants/authorization';

export const clearAuthorizationToken = () => {
    localStorageService.remove(AUTHORIZATION_TOKEN_NAME);
    sessionStorageService.remove(AUTHORIZATION_TOKEN_NAME);
};

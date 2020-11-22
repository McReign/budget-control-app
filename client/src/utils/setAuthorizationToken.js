import { localStorageService, sessionStorageService } from '../services/StorageService';
import { AUTHORIZATION_TOKEN_NAME } from '../constants/authorization';

export const setAuthorizationToken = (token, remember) => {
    return remember ?
        localStorageService.set(AUTHORIZATION_TOKEN_NAME, token)
        : sessionStorageService.set(AUTHORIZATION_TOKEN_NAME, token);
};

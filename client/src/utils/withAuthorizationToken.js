import { getAuthorizationToken } from './getAuthorizationToken';
import { AUTHORIZATION_TOKEN_NAME } from '../constants/authorization';

export const withAuthorizationToken = (obj) => {
    const token = getAuthorizationToken();
    return { ...obj, [AUTHORIZATION_TOKEN_NAME]: token };
};

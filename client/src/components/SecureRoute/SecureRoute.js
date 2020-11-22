import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getAuthorizationToken } from '../../utils/getAuthorizationToken';

export class SecureRoute extends Route {
    render() {
        const token = getAuthorizationToken();

        if (!!token) {
            return super.render()
        }

        return <Redirect to={'/login'} />
    }
}

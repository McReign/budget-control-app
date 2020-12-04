import React from 'react';
import { Route } from 'react-router-dom';

// TODO
export const NestedRoute = ({ computedMatch, path, children }) => {
    return (
        <Route path={`${computedMatch.path}${path}`}>
            {children}
        </Route>
    );
}

import React, { useEffect } from 'react';
import { Switch, Route, useParams, Redirect } from 'react-router-dom';

import { Profile } from './contents/Profile/Profile';
import { UserMenuKey } from '../LeftSider/menus/UserMenu/UserMenu';

export const UserContent = () => {
    const { tab } = useParams();

    if (!tab) {
        return <Redirect to={`/user/${UserMenuKey.PROFILE}`} />;
    }

    return (
        <Switch>
            <Route path={`/user/${UserMenuKey.PROFILE}`}>
                <Profile />
            </Route>
        </Switch>
    );
};

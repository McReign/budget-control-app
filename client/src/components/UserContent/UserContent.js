import React, { useEffect } from 'react';
import { Switch, Route, useParams, Redirect } from 'react-router-dom';

import { UserMenuKey } from '../LeftSider/menus/UserMenu/UserMenu';
import { Profile } from './contents/Profile/Profile';
import { Categories } from './contents/Categories/Categories';

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
            <Route path={`/user/${UserMenuKey.CATEGORIES}`}>
                <Categories />
            </Route>
        </Switch>
    );
};

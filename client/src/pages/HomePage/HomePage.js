import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from "react-router-dom";
import { MainLayout } from '../layouts/MainLayout/MainLayout'
import { RequestStatus, RequestWrapper } from '../../components/RequestWrapper/RequestWrapper';
import { getUser, getUserData } from '../../store/modules/user/thunks';
import { getNotifications } from '../../store/modules/notifications/thunks';
import { getWalletOperations, getWallets } from '../../store/modules/wallets/thunks';
import { getCategories } from '../../store/modules/categories/thunks';
import { LeftSiderWithStore } from '../../components/LeftSider/LeftSiderWithStore';
import { WalletContent } from '../../components/WalletContent/WalletContent';
import { UserContent } from '../../components/UserContent/UserContent';

export const HomePage = () => {
    const dispatch = useDispatch();
    const [requestStatus, setRequestStatus] = useState(null);

    useEffect(() => {
        fetchUserData();
        fetchCategoriesData();
    }, []);

    const fetchUserData = () => {
        setRequestStatus(RequestStatus.LOADING);
        return dispatch(getUserData())
            .then(() => setRequestStatus(RequestStatus.LOADED))
            .catch(() => setRequestStatus(RequestStatus.ERROR));
    };

    const fetchCategoriesData = () => {
        return dispatch(getCategories());
    };

    return (
        <RequestWrapper requestStatus={requestStatus}>
            <MainLayout sider={<LeftSiderWithStore />}>
                <Switch>
                    <Route path='/wallets/:walletId/:tab?'>
                        <WalletContent />
                    </Route>
                    <Route path='/user/:tab?'>
                        <UserContent />
                    </Route>
                </Switch>
            </MainLayout>
        </RequestWrapper>
    );
}

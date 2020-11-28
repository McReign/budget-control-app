import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from "react-router-dom";
import { MainLayout } from '../layouts/MainLayout/MainLayout'
import { RequestStatus, RequestWrapper } from '../../components/RequestWrapper/RequestWrapper';
import { getNotifications, getUser } from '../../store/modules/user/thunks';
import { getWalletOperations, getWallets } from '../../store/modules/wallets/thunks';
import { getCategories } from '../../store/modules/categories/thunks';
import { LeftSiderWithStore } from '../../components/LeftSider/LeftSiderWithStore';
import { WalletContent } from '../../components/WalletContent/WalletContent';

export const HomePage = () => {
    const dispatch = useDispatch();
    const [requestStatus, setRequestStatus] = useState(null);

    useEffect(() => {
        fetchUserData();
        fetchCategoriesData();
    }, []);

    const fetchUserData = () => {
        setRequestStatus(RequestStatus.LOADING);
        return Promise.all([fetchUser(), fetchWallets(), fetchNotifications()])
            .then(() => setRequestStatus(RequestStatus.LOADED))
            .catch(() => setRequestStatus(RequestStatus.ERROR));
    };

    const fetchWalletData = (walletId) => {
        return dispatch(getWalletOperations(walletId));
    };

    const fetchCategoriesData = () => {
        return dispatch(getCategories());
    };

    const fetchUser = () => {
        return dispatch(getUser());
    };

    const fetchWallets = () => {
        return dispatch(getWallets());
    };

    const fetchNotifications = () => {
        return dispatch(getNotifications());
    };

    return (
        <RequestWrapper requestStatus={requestStatus}>
            <MainLayout sider={<LeftSiderWithStore />}>
                <Switch>
                    <Route path='/wallets/:walletId/:key?'>
                        <WalletContent />
                    </Route>
                    <Route path='/user'>
                        User
                    </Route>
                </Switch>
            </MainLayout>
        </RequestWrapper>
    );
}

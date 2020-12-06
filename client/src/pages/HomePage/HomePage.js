import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from "react-router-dom";
import { MainLayout } from '../layouts/MainLayout/MainLayout'
import { RequestStatus, RequestWrapper } from '../../components/RequestWrapper/RequestWrapper';
import { getUserData } from '../../store/modules/user/thunks';
import { LeftSiderWithStore } from '../../components/LeftSider/LeftSiderWithStore';
import { WalletContent } from '../../components/WalletContent/WalletContent';
import { UserContent } from '../../components/UserContent/UserContent';
import { HelpContent } from '../../components/HelpContent/HelpContent';

export const HomePage = () => {
    const dispatch = useDispatch();
    const [requestStatus, setRequestStatus] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = () => {
        setRequestStatus(RequestStatus.LOADING);
        return dispatch(getUserData())
            .then(() => setRequestStatus(RequestStatus.LOADED))
            .catch(() => setRequestStatus(RequestStatus.ERROR));
    };

    return (
        <RequestWrapper requestStatus={requestStatus}>
            <MainLayout leftSider={LeftSiderWithStore}>
                <Switch>
                    <Route path='/wallets/:walletId/:tab?'>
                        <WalletContent />
                    </Route>
                    <Route path='/user/:tab?'>
                        <UserContent />
                    </Route>
                    <Route path='/help'>
                        <HelpContent />
                    </Route>
                </Switch>
            </MainLayout>
        </RequestWrapper>
    );
}

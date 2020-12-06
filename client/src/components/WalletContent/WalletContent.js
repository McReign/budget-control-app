import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useParams, Redirect } from 'react-router-dom';

import { WalletSummary } from './contents/WalletSummary/WalletSummary';
import { WalletTransactions } from './contents/WalletTransactions/WalletTransactions';
import { WalletUsers } from './contents/WalletUsers/WalletUsers';
import { WalletReports } from './contents/WalletReports/WalletReports';

import { WalletMenuKey } from '../LeftSider/menus/WalletMenu/WalletMenu';
import { getWalletData } from '../../store/modules/wallets/thunks';
import { RequestWrapper } from '../RequestWrapper/RequestWrapper';
import { mapStoreRequestStateToRequestStatus } from '../../utils/mapStoreRequestStateToRequestStatus';
import { errorsSelector, isLoadingSelector, walletsSelector } from '../../store/modules/wallets/selectors';
import { walletEnhancer } from '../../store/modules/wallets/selectorEnhancers';

export const WalletContent = () => {
    const { walletId, tab } = useParams();
    const dispatch = useDispatch();

    const isOperationsLoading = useSelector(isLoadingSelector);
    const operationsError = useSelector(errorsSelector);
    const wallet = walletEnhancer(useSelector(walletsSelector))(walletId);

    useEffect(() => {
        dispatch(getWalletData(walletId));
    }, [walletId]);

    if (!tab) {
        return <Redirect to={`/wallets/${walletId}/${WalletMenuKey.SUMMARY}`} />;
    }

    return (
        <RequestWrapper requestStatus={mapStoreRequestStateToRequestStatus(wallet, isOperationsLoading, operationsError)}>
            <Switch>
                <Route path={`/wallets/:walletId/${WalletMenuKey.SUMMARY}`}>
                    <WalletSummary />
                </Route>
                <Route path={`/wallets/:walletId/${WalletMenuKey.TRANSACTIONS}`}>
                    <WalletTransactions />
                </Route>
                <Route path={`/wallets/:walletId/${WalletMenuKey.REPORTS}`}>
                    <WalletReports />
                </Route>
                <Route path={`/wallets/:walletId/${WalletMenuKey.USERS}`}>
                    <WalletUsers />
                </Route>
            </Switch>
        </RequestWrapper>
    );
};

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useParams, Redirect } from 'react-router-dom';
import { Result } from 'antd';

import { WalletSummary } from './contents/WalletSummary/WalletSummary';
import { WalletTransactions } from './contents/WalletTransactions/WalletTransactions';
import { WalletUsers } from './contents/WalletUsers/WalletUsers';

import { WalletMenuKey } from '../LeftSider/menus/WalletMenu/WalletMenu';
import { getWalletOperations } from '../../store/modules/wallets/thunks';
import { RequestWrapper } from '../RequestWrapper/RequestWrapper';
import { mapStoreRequestStateToRequestStatus } from '../../utils/mapStoreRequestStateToRequestStatus';
import { errorsSelector, isLoadingSelector, walletsSelector } from '../../store/modules/wallets/selectors';
import { walletEnhancer } from '../../store/modules/wallets/selectorEnhancers';

export const WalletContent = () => {
    const { walletId, key } = useParams();
    const dispatch = useDispatch();

    const isOperationsLoading = useSelector(isLoadingSelector);
    const operationsError = useSelector(errorsSelector);
    const wallet = walletEnhancer(useSelector(walletsSelector))(walletId);

    useEffect(() => {
        dispatch(getWalletOperations(walletId));
    }, [walletId]);

    if (!key) {
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
                    <Result
                        status="404"
                        title="Страница не найдена"
                        subTitle="Осталось совсем чуть-чуть. В следующих версиях будут добавлены отчеты."
                    />
                </Route>
                <Route path={`/wallets/:walletId/${WalletMenuKey.USERS}`}>
                    <WalletUsers />
                </Route>
            </Switch>
        </RequestWrapper>
    );
};
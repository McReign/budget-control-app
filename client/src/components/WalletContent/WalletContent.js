import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Result } from 'antd';

import { WalletMenuKey } from '../LeftSider/menus/WalletMenu/WalletMenu';

import { WalletSummary } from './contents/WalletSummary/WalletSummary';
import { WalletTransactions } from './contents/WalletTransactions/WalletTransactions';
import { WalletUsers } from './contents/WalletUsers/WalletUsers';

export const WalletContent = () => {
    return (
        <Switch>
            <Route path={`/wallet/:walletId/${WalletMenuKey.SUMMARY}`}>
                <WalletSummary />
            </Route>
            <Route path={`/wallet/:walletId/${WalletMenuKey.TRANSACTIONS}`}>
                <WalletTransactions />
            </Route>
            <Route path={`/wallet/:walletId/${WalletMenuKey.REPORTS}`}>
                <Result
                    status="404"
                    title="Страница не найдена"
                    subTitle="Осталось совсем чуть-чуть. В следующих версиях будут добавлены отчеты."
                />
            </Route>
            <Route path={`/wallet/:walletId/${WalletMenuKey.USERS}`}>
                <WalletUsers />
            </Route>
        </Switch>
    );
};

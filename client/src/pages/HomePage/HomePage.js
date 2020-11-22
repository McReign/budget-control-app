import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    AlignLeftOutlined,
    DollarCircleOutlined,
    PieChartOutlined,
    UsergroupAddOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { MainLayout } from '../layouts/MainLayout/MainLayout'
import { LeftSider } from '../../components/LeftSider/LeftSider';
import { RequestStatus, RequestWrapper } from '../../components/RequestWrapper/RequestWrapper';
import { getUser, logoutUser } from '../../store/modules/user/thunks';
import { getWalletOperations, getWallets } from '../../store/modules/wallets/thunks';
import { ComponentResolver } from '../../utils/ComponentResolver';
import { userSelector } from '../../store/modules/user/selectors';
import { getFirstLetter } from '../../utils/getFirstLetter';
import { walletsSelector } from '../../store/modules/wallets/selectors';
import { message, Result } from 'antd';
import { ERROR_MESSAGE_DURATION } from '../../constants/errors';
import { WalletSummary } from '../../components/WalletSummary/WalletSummary';
import { getCategories } from '../../store/modules/categories/thunks';
import { WalletTransactions } from '../../components/WalletTransactions/WalletTransactions';

const DEFAULT_MENU_ITEM = 'summary';

const menuItems = {
    wallet: [
        {
            key: 'summary',
            icon: AlignLeftOutlined,
            name: 'Сводка',
        },
        {
            key: 'transactions',
            icon: DollarCircleOutlined,
            name: 'Транзакции',
        },
        {
            key: 'reports',
            icon: PieChartOutlined,
            name: 'Отчеты',
        },
        {
            key: 'users',
            icon: UsergroupAddOutlined,
            name: 'Пользователи',
        },
    ],
    user: [
        {
            key: 'logout',
            icon: LogoutOutlined,
            name: 'Выйти',
        },
    ],
};

const componentResolver = new ComponentResolver();

componentResolver
    .register('summary', WalletSummary)
    .register('transactions', WalletTransactions)
    .register('reports', () => (
        <Result
            status="404"
            title="Страница не найдена"
            subTitle="Осталось совсем чуть-чуть. В следующих версиях будут добавлены отчеты."
        />
    ))
    .register('users', () => (
        <Result
            status="404"
            title="Страница не найдена"
            subTitle="Осталось совсем чуть-чуть. В следующих версиях будут добавлены пользователи."
        />
    ));

export const HomePage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(userSelector);
    const wallets = useSelector(walletsSelector);
    const [requestStatus, setRequestStatus] = useState(null);
    const [miniMenuItem, setMiniMenuItem] = useState(null);
    const [miniMenuItemId, setMiniMenuItemId] = useState(null);
    const [menuItem, setMenuItem] = useState(DEFAULT_MENU_ITEM);

    useEffect(() => {
        fetchUserData();
        fetchCategoriesData();
    }, []);

    useEffect(() => {
        if (user) {
            setMiniMenuItem('wallet');
            setMiniMenuItemId(user.activeWallet);
        }
    }, [user]);

    useEffect(() => {
        if (miniMenuItemId && miniMenuItem === 'wallet') {
            fetchWalletData(miniMenuItemId);
        }
    }, [miniMenuItemId]);

    const renderLeftSider = () => {
        return (
            <LeftSider
                menuItem={menuItem}
                miniMenuItem={miniMenuItem}
                miniMenuItemId={miniMenuItemId}
                miniMenuTopItems={generateMiniMenuTopItems(wallets)}
                miniMenuBottomItems={generateMiniMenuBottomItems(user)}
                menuItems={generateMenuItems(miniMenuItem)}
                onMenuSelect={handleMenuItemSelect}
                onMiniMenuSelect={handleMiniMenuItemSelect}
            />
        );
    };

    const handleLogout = () => {
        dispatch(logoutUser())
            .then(() => history.push('/login'))
            .catch(errors => message.error(errors?.common, ERROR_MESSAGE_DURATION));
    };

    const handleMenuItemSelect = (key) => {
        if (key === 'logout') {
            return handleLogout();
        }

        setMenuItem(key);
    };

    const handleMiniMenuItemSelect = (key, id) => {
        setMiniMenuItem(key);
        if (key === 'wallet') {
            setMiniMenuItemId(id);
        }
    };

    const fetchUserData = () => {
        setRequestStatus(RequestStatus.LOADING);
        return Promise.all([fetchUser(), fetchWallets()])
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

    const generateMiniMenuTopItems = (wallets) => {
        if (!wallets) return [];
        return wallets.map((wallet, index) => ({
            key: 'wallet',
            id: wallet.id,
            name: index + 1,
        }));
    };

    const generateMiniMenuBottomItems = (user) => {
        if (!user) return [];
        return [
            {
                key: 'user',
                id: user.id,
                name: getFirstLetter(user.displayName),
            }
        ];
    };

    const generateMenuItems = (miniMenuItem) => {
        if (!miniMenuItem) return [];
        return menuItems[miniMenuItem];
    };

    return (
        <RequestWrapper requestStatus={requestStatus}>
            <MainLayout sider={renderLeftSider()}>
                {componentResolver.resolve(menuItem, { walletId: miniMenuItemId })}
            </MainLayout>
        </RequestWrapper>
    );
}

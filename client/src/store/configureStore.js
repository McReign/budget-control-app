import { combineReducers } from 'redux';

import { userReducer } from './modules/user/reducer';
import { walletsReducer } from './modules/wallets/reducer';
import { categoriesReducer } from './modules/categories/reducer';

export const createRootReducer = () => {
    return combineReducers({
        userState: userReducer,
        walletsState: walletsReducer,
        categoriesState: categoriesReducer,
    });
};

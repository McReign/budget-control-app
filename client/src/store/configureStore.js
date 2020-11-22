import { applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

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

export const createEnhancers = () => {
    const middlewareEnhancer = applyMiddleware(thunkMiddleware);
    return composeWithDevTools(middlewareEnhancer);
};

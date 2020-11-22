import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createRootReducer } from './configureStore';

export const initStore = () => {
    const composeEnhancers = composeWithDevTools({});
    return createStore(createRootReducer(), composeEnhancers(applyMiddleware(thunkMiddleware)));
};

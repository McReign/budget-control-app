import { createStore } from 'redux';
import { createEnhancers, createRootReducer } from './configureStore';

export const initStore = () => {
    return createStore(createRootReducer(), createEnhancers());
};

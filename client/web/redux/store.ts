import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initializeStore = (preloadedState?: any) => {
    const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk));
    return store;
};

export default initializeStore;

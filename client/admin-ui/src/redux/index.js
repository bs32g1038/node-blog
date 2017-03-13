import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducer';

var store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;
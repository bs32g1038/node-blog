import { createStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import articles from './reducers/articles';
import categories from './reducers/categories';
import article from './reducers/article';

const rootReducer = combineReducers({
    articles,
    categories,
    article,
});

export type RootState = ReturnType<typeof rootReducer>;

function initializeStore(_initialState: RootState) {
    return createStore(rootReducer, _initialState, composeWithDevTools(applyMiddleware(thunk)));
}

export default initializeStore;

import { combineReducers } from 'redux';
import articles from './articles';
import categories from './categories';

export default combineReducers({
    articles,
    categories
});

import { combineReducers } from 'redux';
import article from './article';
import articles from './articles';
import categories from './categories';

export default combineReducers({
    article,
    articles,
    categories
});

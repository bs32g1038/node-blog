import { combineReducers } from 'redux';
import article from './article';
import articles from './articles';
import categories from './categories';
import guestbooks from './guestbooks';
import links from './links';

export default combineReducers({
    article,
    articles,
    guestbooks,
    links,
    categories
});

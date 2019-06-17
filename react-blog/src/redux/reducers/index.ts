import { combineReducers } from 'redux';
import about from './about';
import article from './article';
import articles from './articles';
import categories from './categories';
import global from './global';
import guestbooks from './guestbooks';
import links from './links';

export default combineReducers({
    article,
    articles,
    guestbooks,
    links,
    categories,
    about,
    $G: global
});

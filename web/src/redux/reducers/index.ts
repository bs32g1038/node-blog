import { combineReducers } from 'redux';
import about from './about';
import article from './article';
import articles from './articles';
import categories from './categories';
import global from './global';

export default combineReducers({
    article,
    articles,
    categories,
    about,
    $G: global
});

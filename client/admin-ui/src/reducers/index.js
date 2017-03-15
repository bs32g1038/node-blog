import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import articles from './articles';
import categories from './categories';
import comments from './comments';
import guestbooks from './guestbooks'
import links from './links'
const rootReducer = combineReducers({
    articles,
    categories,
    comments,
    guestbooks,
    links,
    routing
})
export default rootReducer
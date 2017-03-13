import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import articles from './modules/article';
import categories from './modules/category';
import comments from './modules/comment';
const rootReducer = combineReducers({
    articles,
    categories,
    comments,
    routing
})
export default rootReducer
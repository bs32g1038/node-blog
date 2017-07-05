import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { articles } from './article';
import { comments } from './comment';
import { user } from './user';
import { dashboard } from './dashboard';

const rootReducer = combineReducers({
  articles,
  comments,
  user,
  dashboard,
  routing
})
export default rootReducer
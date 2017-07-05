import React from 'react';
import {IndexRoute, Route, Redirect} from 'react-router';
import Main from './containers/Main'
import Dashboard from './containers/Dashboard'
import ArticleList from './containers/ArticleList'
import CommentList from './containers/CommentList'
import UserLogin from './containers/UserLogin'
import config from './config';

export default () => {
  const requireLogin = (nextState, replace, next) => {
  const token = window.sessionStorage.getItem(config.tokenKey);
    if (!token) {
      replace('/admin/login');
    }
    next();
  };
  const onChange = ()=>{
    // 路由跳转的时候滚动到页面顶部
    document.getElementsByTagName('div')[1].scrollTop = 0;
  };
 return (
    <Route>
      <Route onEnter={requireLogin} onChange={onChange} path='/admin' component={Main}>
        <IndexRoute component={Dashboard}/>
        <Route path='articles' component={ArticleList} />
        <Route path='comments' component={CommentList} />
      </Route>
      <Route path='/admin/login' component={UserLogin}/>
      <Redirect from="*" to="/admin" />
    </Route>
  );
};

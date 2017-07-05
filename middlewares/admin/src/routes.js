import Main from './containers/Main'
import Dashboard from './containers/Dashboard'
import ArticleList from './containers/ArticleList'
// import CategoryList from './containers/CategoryList'
import CommentList from './containers/CommentList'
// import GuestbookList from './containers/GuestbookList'
// import UserInfo from './containers/UserInfo'
import UserLogin from './containers/UserLogin'
// import AboutEdit from './containers/AboutEdit'
// import SettingEdit from './containers/SettingEdit'
// import LinkList from './containers/LinkList';

export default [{
  path: '/admin/login',
  component: UserLogin
}, {
  path: '/admin',
  component: Main,
  indexRoute: { component: Dashboard },
  childRoutes: [
    { path: "articles", component: ArticleList },
    { path: "comments", component: CommentList },
  ]
}, {
  path: '*',
  redirect: '/admin'
}]
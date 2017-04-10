import Main from './containers/Main'
import Dashboard from './containers/Dashboard'
import ArticleList from './containers/ArticleList'
import CategoryList from './containers/CategoryList'
import CommentList from './containers/CommentList'
import GuestbookList from './containers/GuestbookList'
import UesrBaseInfoEdit from './components/UesrBaseInfoEdit'
import UserLogin from './containers/UserLogin'
import AboutEdit from './components/AboutEdit'
import BaseSettingEdit from './components/BaseSettingEdit'
import LinkList from './containers/LinkList';

export default [{
    path: '/admin/user/login',
    component: UserLogin
}, {
    path: '/admin',
    component: Main,
    indexRoute: { component: Dashboard },
    childRoutes: [
        { path: "articles", component: ArticleList },
        { path: "categorys", component: CategoryList },
        { path: "comments", component: CommentList },
        { path: "guestbooks", component: GuestbookList },
        { path: "users/:account/edit", component: UesrBaseInfoEdit },        
        { path: "abouts/:id/edit", component: AboutEdit },
        { path: "settings/:id/edit", component: BaseSettingEdit },
        { path: "links", component: LinkList },
    ]
}]
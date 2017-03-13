import Main from './containers/Main.jsx'
import ArticleList from './containers/article/ArticleList'
import ArticleEdit from './containers/article/ArticleEdit'
import CategoryList from './containers/category/CategoryList'
import CommentList from './containers/comment/CommentList'
import GuestbookList from './containers/guestbook/GuestbookList'
import UesrBaseInfoEdit from './containers/user/UesrBaseInfoEdit'
import UserLogin from './containers/user/UserLogin'
import AboutEdit from './containers/about/AboutEdit'
import BaseSettingEdit from './containers/setting/BaseSettingEdit'
import LinkList from './containers/link/LinkList';

export default [{
    path: '/admin/user/login',
    component: UserLogin
}, {
    path: '/admin',
    component: Main,
    indexRoute: { component: ArticleList },
    childRoutes: [
        { path: "articles", component: ArticleList },        
        { path: "articles/:id/edit", component: ArticleEdit },
        { path: "articles/add", component: ArticleEdit },
        { path: "categorys", component: CategoryList },
        { path: "comments", component: CommentList },
        { path: "guestbooks", component: GuestbookList },
        { path: "users/:account/edit", component: UesrBaseInfoEdit },        
        { path: "abouts/:id/edit", component: AboutEdit },
        { path: "settings/:id/edit", component: BaseSettingEdit },
        { path: "links", component: LinkList },
    ]
}]
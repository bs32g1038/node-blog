import Main from './components/Main.jsx'
import ArticleList from './components/article/ArticleList'
import ArticleEdit from './components/article/ArticleEdit'
import CategoryList from './components/category/CategoryList'
import CommentList from './components/comment/CommentList'
import GuestbookList from './components/guestbook/GuestbookList'
import UesrBaseInfoEdit from './components/user/UesrBaseInfoEdit'
import UserLogin from './components/user/UserLogin'
import AboutEdit from './components/about/AboutEdit'
import BaseSettingEdit from './components/setting/BaseSettingEdit'
import LinkList from './components/link/LinkList';

export default [{
    path: '/admin/user/login',
    component: UserLogin
}, {
    path: '/',
    component: Main,
    indexRoute: { component: ArticleList },
    childRoutes: [
        { path: "admin/article/:id/edit", component: ArticleEdit },
        { path: "admin/article/add", component: ArticleEdit },
        { path: "admin/category/list", component: CategoryList },
        { path: "admin/comment/list", component: CommentList },
        { path: "admin/guestbook/list", component: GuestbookList },
        { path: "admin/user/:account", component: UesrBaseInfoEdit },
        { path: "admin/about/:id", component: AboutEdit },
        { path: "admin/setting/:id", component: BaseSettingEdit },
        { path: "admin/link/list", component: LinkList },
    ]
}]
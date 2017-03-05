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
    path: '/admin',
    component: Main,
    indexRoute: { component: ArticleList },
    childRoutes: [
        { path: "articles", component: ArticleList },        
        { path: "article/:id/edit", component: ArticleEdit },
        { path: "article/add", component: ArticleEdit },
        { path: "category/list", component: CategoryList },
        { path: "comment/list", component: CommentList },
        { path: "guestbook/list", component: GuestbookList },
        { path: "user/:account", component: UesrBaseInfoEdit },
        { path: "about/:id", component: AboutEdit },
        { path: "setting/:id", component: BaseSettingEdit },
        { path: "link/list", component: LinkList },
    ]
}]
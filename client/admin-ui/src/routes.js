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
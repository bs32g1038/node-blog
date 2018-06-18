import Articles from './components/Articles';
import Guestbooks from './components/Guestbooks';
import Article from './components/Article';
import About from './components/About';
import Music from './components/Music';
import FriendlyLinks from './components/FriendlyLinks';

const routes = [{
    path: '/',
    exact: true,
    component: Articles
}, {
    path: '/blog',
    exact: true,
    component: Articles
}, {
    path: '/blog/articles/:id',
    exact: true,
    component: Article
}, {
    path: '/blog/articles',
    exact: true,
    component: Articles
}, {
    path: '/blog/guestbook',
    exact: true,
    component: Guestbooks
}, {
    path: '/blog/about',
    exact: true,
    component: About
}, {
    path: '/blog/music',
    exact: true,
    component: Music
}, {
    path: '/blog/links',
    exact: true,
    component: FriendlyLinks
}];

export default routes;

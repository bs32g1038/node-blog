import { withStore } from './context/store';
import Articles from './components/articles';
// import articles from './components/articles';
import Guestbooks from './components/guestbooks';
import Article from './components/article';
// import About from './components/About';
import Music from './components/music';
import FriendlyLinks from './components/friendly-links';
import App from './App';

const routes = [
    {
        path: '/blog',
        component: withStore(App),
        asyncData: App.asyncData,
        routes: [
            {
                path: '/blog',
                exact: true,
                component: withStore(Articles),
                asyncData: Articles.asyncData
            },
            {
                path: '/blog/articles/:id',
                exact: true,
                component: withStore(Article),
                asyncData: Article.asyncData
            },
            {
                path: '/blog/articles',
                exact: true,
                component: withStore(Articles),
                asyncData: Articles.asyncData,

            },
            {
                path: '/blog/guestbook',
                exact: true,
                component: withStore(Guestbooks),
                asyncData: Guestbooks.asyncData
            },
            // {
            //     path: '/blog/about',
            //     exact: true,
            //     component: About
            // },
            {
                path: '/blog/music',
                exact: true,
                component: Music
            },
            {
                path: '/blog/links',
                exact: true,
                component: withStore(FriendlyLinks),
                asyncData: FriendlyLinks.asyncData
            }
        ]
    }
];

export default routes;

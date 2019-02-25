import React from 'react';
import App from './App';
import About from './components/about';
import Article from './components/article';
import Articles from './components/articles';
import FriendlyLinks from './components/friendly-links';
import Guestbooks from './components/guestbooks';
import Home from './components/home';

const routes: any = [
    {
        component: Home,
        path: '/',
        exact: true
    },
    {
        component: App,
        path: '/blog',
        routes: [
            {
                component: Articles,
                exact: true,
                path: '/blog'
            },
            {
                component: Article,
                exact: true,
                path: '/blog/articles/:id'
            },
            {
                component: (props: any) => <Articles {...props} />,
                exact: true,
                path: '/blog/articles'
            },
            {
                component: Guestbooks,
                exact: true,
                path: '/blog/guestbook'
            },
            {
                component: FriendlyLinks,
                exact: true,
                path: '/blog/links'
            },
            {
                component: About,
                exact: true,
                path: '/blog/about'
            }
        ]
    }
];

export default routes;

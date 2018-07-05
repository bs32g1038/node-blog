import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { withStore } from './context/store';
import articles from './components/articles';
// import Guestbooks from './components/Guestbooks';
// import Article from './components/Article';
// import About from './components/About';
// import Music from './components/Music';
// import FriendlyLinks from './components/FriendlyLinks';
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
                component: withStore(articles),
                asyncData: articles.asyncData
            },
            // {
            //     path: '/blog/articles/:id',
            //     exact: true,
            //     component: Article
            // }, {
            //     path: '/blog/articles',
            //     exact: true,
            //     component: Articles
            // }, {
            //     path: '/blog/guestbook',
            //     exact: true,
            //     component: Guestbooks
            // }, 
            // {
            //     path: '/blog/about',
            //     exact: true,
            //     component: About
            // },
            //  {
            //     path: '/blog/music',
            //     exact: true,
            //     component: Music
            // }, {
            //     path: '/blog/links',
            //     exact: true,
            //     component: FriendlyLinks
            // }]
        ]
    }
];

export default routes;

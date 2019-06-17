import React from 'react';
import { Redirect } from 'react-router-dom';
import App from './App';
import About from './components/about';
import Article from './components/article';
import Articles from './components/articles';

const routes: any = [
    {
        render: () => <Redirect to="/blog" />,
        path: '/',
        exact: true
    },
    {
        component: App,
        path: '/',
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
                component: Articles,
                exact: true,
                path: '/blog/categories/:cid'
            },
            {
                component: About,
                exact: true,
                path: '/about'
            }
        ]
    }
];

export default routes;
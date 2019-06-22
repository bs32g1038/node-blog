import React from 'react';
import { Redirect } from 'react-router-dom';
import * as app from './App';
import * as about from './components/about';
import * as article from './components/article';
import * as articles from './components/articles';

const routes: any = [
    {
        render: () => <Redirect to="/blog" />,
        path: '/',
        exact: true
    },
    {
        component: app.App,
        asyncData: app.asyncData,
        path: '/',
        routes: [
            {
                component: articles.Articles,
                asyncData: articles.asyncData,
                exact: true,
                path: '/blog'
            },
            {
                component: articles.Articles,
                asyncData: articles.asyncData,
                exact: true,
                path: '/blog/categories/:cid'
            },
            {
                component: article.Article,
                asyncData: article.asyncData,
                exact: true,
                path: '/blog/articles/:id'
            },
            {
                component: about.About,
                asyncData: about.asyncData,
                exact: true,
                path: '/about'
            }
        ]
    }
];

export default routes;
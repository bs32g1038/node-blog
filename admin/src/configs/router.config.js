import React from 'react';
import BasicLayout from '../layouts/BasicLayout';
import RouteView from '../layouts/RouteView';
import { Redirect } from 'react-router-dom';

import Exception404 from '../components/Exception404';

import {
    Dashboard,
    Articles,
    ArticleEdit,
    Categories,
    CategoryEdit,
    Comments,
    CommentReply,
    DemoEdit,
    Demos,
    Medias,
    StaticFiles,
} from '../pages';

export default [
    {
        path: '/',
        component: BasicLayout,
        routes: [
            {
                path: '/',
                exact: true,
                component: () => <Redirect push to="/dashboard/analysis" />,
            },
            {
                path: '/dashboard',
                exact: true,
                component: () => <Redirect push to="/dashboard/analysis" />,
            },
            {
                path: '/dashboard',
                title: '仪表盘',
                icon: 'dashboard',
                component: RouteView,
                routes: [
                    {
                        path: '/dashboard/analysis',
                        title: '分析页',
                        component: Dashboard,
                    },
                ],
            },
            {
                path: '/content',
                title: '博客管理',
                icon: 'form',
                component: RouteView,
                routes: [
                    {
                        path: '/content/articles',
                        title: '文章管理',
                        component: RouteView,
                        routes: [
                            {
                                path: '/content/articles',
                                exact: true,
                                component: Articles,
                            },
                            {
                                title: '添加文章',
                                path: '/content/articles/edit',
                                exact: true,
                                component: ArticleEdit,
                            },
                            {
                                title: '编辑文章',
                                path: '/content/articles/edit/:id',
                                exact: true,
                                component: ArticleEdit,
                            },
                            {
                                component: Exception404,
                            },
                        ],
                    },
                    {
                        path: '/content/categories',
                        title: '分类管理',
                        component: RouteView,
                        routes: [
                            {
                                path: '/content/categories',
                                exact: true,
                                component: Categories,
                            },
                            {
                                title: '添加分类',
                                path: '/content/categories/edit',
                                exact: true,
                                component: CategoryEdit,
                            },
                            {
                                title: '编辑分类',
                                path: '/content/categories/edit/:id',
                                exact: true,
                                component: CategoryEdit,
                            },
                            {
                                component: Exception404,
                            },
                        ],
                    },
                    {
                        path: '/content/comments',
                        title: '评论管理',
                        component: RouteView,
                        routes: [
                            {
                                path: '/content/comments',
                                exact: true,
                                component: Comments,
                            },
                            {
                                title: '回复评论',
                                path: '/content/comments/reply/:id',
                                exact: true,
                                component: CommentReply,
                            },
                            {
                                component: Exception404,
                            },
                        ],
                    },
                ],
            },
            {
                path: '/code',
                title: '代码管理',
                icon: 'codepen',
                component: RouteView,
                routes: [
                    {
                        path: '/code/demos',
                        title: '代码demo',
                        component: RouteView,
                        routes: [
                            {
                                path: '/code/demos',
                                exact: true,
                                component: Demos,
                            },
                            {
                                title: '添加demo',
                                path: '/code/demos/edit',
                                exact: true,
                                component: DemoEdit,
                            },
                            {
                                title: '编辑demo',
                                path: '/code/demos/edit/:id',
                                exact: true,
                                component: DemoEdit,
                            },
                            {
                                component: Exception404,
                            },
                        ],
                    },
                    {
                        path: '/code/static-files',
                        title: '静态文件',
                        exact: true,
                        component: StaticFiles,
                    },
                    {
                        path: '/code/static-files/:folderId',
                        exact: true,
                        component: StaticFiles,
                    },
                    {
                        component: Exception404,
                    },
                ],
            },
            {
                path: '/medias',
                title: '媒体管理',
                icon: 'appstore',
                component: RouteView,
                routes: [
                    {
                        path: '/medias/images',
                        title: '图片列表',
                        exact: true,
                        component: Medias,
                    },
                    {
                        component: Exception404,
                    },
                ],
            },
            {
                component: Exception404,
            },
        ],
    },
];

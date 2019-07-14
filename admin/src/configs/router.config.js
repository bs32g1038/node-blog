import React from 'react';
import BasicLayout from '../layouts/BasicLayout'
import RouteView from '../layouts/RouteView'
import { Redirect } from 'react-router-dom'

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
    StaticFiles
} from '../pages'

export default [
    {
        path: '/',
        component: BasicLayout,
        routes: [
            {
                path: ['/', '/dashboard'],
                exact: true,
                component: () => (
                    <Redirect push to='/dashboard/analysis' />
                )
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
                    }
                ]
            },
            {
                path: '/content',
                title: '博客管理',
                icon: 'form',
                component: RouteView,
                routes: [
                    {
                        path: '/content/articles',
                        exact: true,
                        title: '文章管理',
                        component: Articles
                    },
                    {
                        path: '/content/articles/edit',
                        exact: true,
                        component: ArticleEdit
                    },
                    {
                        path: '/content/articles/edit/:id',
                        exact: true,
                        component: ArticleEdit
                    },
                    {
                        path: '/content/categories',
                        exact: true,
                        title: '分类管理',
                        component: Categories
                    },
                    {
                        path: '/content/categories/edit',
                        exact: true,
                        component: CategoryEdit
                    },
                    {
                        path: '/content/categories/edit/:id',
                        exact: true,
                        component: CategoryEdit
                    },
                    {
                        path: '/content/comments',
                        title: '评论管理',
                        exact: true,
                        component: Comments
                    },
                    {
                        path: '/content/comments/reply/:id',
                        exact: true,
                        component: CommentReply
                    }
                ]
            },
            {
                path: '/demos',
                title: '代码管理',
                icon: 'codepen',
                component: RouteView,
                routes: [
                    {
                        path: '/demos',
                        title: '代码demo',
                        exact: true,
                        component: Demos
                    },
                    {
                        path: '/demos/edit',
                        exact: true,
                        component: DemoEdit
                    },
                    {
                        path: '/demos/edit/:id',
                        exact: true,
                        component: DemoEdit
                    },
                    {
                        path: '/demos/static-files',
                        title: '静态文件',
                        exact: true,
                        component: StaticFiles
                    },
                    {
                        path: '/demos/static-files/:folderId',
                        exact: true,
                        component: StaticFiles
                    }
                ]
            },
            {
                path: '/medias',
                title: '媒体管理',
                icon: 'appstore',
                component: RouteView,
                routes: [
                    {
                        path: '/medias',
                        title: '图片列表',
                        exact: true,
                        component: Medias
                    }
                ]
            }
        ]
    }
]
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
                path: ['/', '/blog/admin', '/blog/admin/dashboard'],
                exact: true,
                component: () => (
                    <Redirect push to='/blog/admin/dashboard/analysis' />
                )
            },
            {
                path: '/blog/admin/dashboard',
                title: '仪表盘',
                icon: 'dashboard',
                component: RouteView,
                routes: [
                    {
                        path: '/blog/admin/dashboard/analysis',
                        title: '分析页',
                        component: Dashboard,
                    }
                ]
            },
            {
                path: '/blog/admin/content',
                title: '博客管理',
                icon: 'form',
                component: RouteView,
                routes: [
                    {
                        path: '/blog/admin/content/articles',
                        exact: true,
                        title: '文章管理',
                        component: Articles
                    },
                    {
                        path: '/blog/admin/content/articles/edit',
                        exact: true,
                        component: ArticleEdit
                    },
                    {
                        path: '/blog/admin/content/articles/edit/:id',
                        exact: true,
                        component: ArticleEdit
                    },
                    {
                        path: '/blog/admin/content/categories',
                        exact: true,
                        title: '分类管理',
                        component: Categories
                    },
                    {
                        path: '/blog/admin/content/categories/edit',
                        exact: true,
                        component: CategoryEdit
                    },
                    {
                        path: '/blog/admin/content/categories/edit/:id',
                        exact: true,
                        component: CategoryEdit
                    },
                    {
                        path: '/blog/admin/content/comments',
                        title: '评论管理',
                        exact: true,
                        component: Comments
                    },
                    {
                        path: '/blog/admin/content/comments/reply/:id',
                        exact: true,
                        component: CommentReply
                    }
                ]
            },
            {
                path: '/blog/admin/demos',
                title: '代码管理',
                icon: 'codepen',
                component: RouteView,
                routes: [
                    {
                        path: '/blog/admin/demos',
                        title: '代码demo',
                        exact: true,
                        component: Demos
                    },
                    {
                        path: '/blog/admin/demos/edit',
                        exact: true,
                        component: DemoEdit
                    },
                    {
                        path: '/blog/admin/demos/edit/:id',
                        exact: true,
                        component: DemoEdit
                    },
                    {
                        path: '/blog/admin/demos/static-files',
                        title: '静态文件',
                        exact: true,
                        component: StaticFiles
                    },
                    {
                        path: '/blog/admin/demos/static-files/:folderId',
                        exact: true,
                        component: StaticFiles
                    }
                ]
            },
            {
                path: '/blog/admin/medias',
                title: '媒体管理',
                icon: 'appstore',
                component: RouteView,
                routes: [
                    {
                        path: '/blog/admin/medias',
                        title: '图片列表',
                        exact: true,
                        component: Medias
                    }
                ]
            }
        ]
    }
]
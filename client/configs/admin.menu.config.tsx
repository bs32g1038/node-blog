import React from 'react';
import {
    DashboardOutlined,
    FormOutlined,
    CommentOutlined,
    CodepenOutlined,
    AppstoreOutlined,
    FileOutlined,
    UserOutlined,
    SettingOutlined,
} from '@ant-design/icons';

export default [
    {
        path: '/admin/dashboard',
        title: '仪表盘',
        icon: <DashboardOutlined />,
    },

    {
        path: '/admin/content/articles',
        title: '文章管理',
        icon: <FormOutlined />,
        childMenus: [
            {
                title: '添加文章',
                path: '/admin/content/articles/edit',
                exact: true,
            },
            {
                title: '编辑文章',
                path: '/admin/content/articles/edit/:id',
                exact: true,
            },
        ],
    },
    {
        path: '/admin/content/categories',
        title: '分类管理',
        icon: <AppstoreOutlined />,
        childMenus: [
            {
                title: '添加分类',
                path: '/admin/content/categories/edit',
                exact: true,
            },
            {
                title: '编辑分类',
                path: '/admin/content/categories/edit/:id',
                exact: true,
            },
        ],
    },
    {
        path: '/admin/content/comments',
        title: '评论管理',
        icon: <CommentOutlined />,
        childMenus: [
            {
                title: '回复评论',
                path: '/admin/content/comments/reply/:id',
                exact: true,
            },
        ],
    },
    {
        path: '/admin/code/demos',
        title: '代码demo',
        icon: <CodepenOutlined />,
        childMenus: [
            {
                title: '添加demo',
                path: '/admin/code/demos/edit',
                exact: true,
            },
            {
                title: '编辑demo',
                path: '/admin/code/demos/edit/:id',
                exact: true,
            },
        ],
    },
    {
        path: '/admin/code/static-files',
        title: '静态文件',
        icon: <FileOutlined />,
        exact: true,
    },
    {
        path: '/admin/code/static-files/:folderId',
        exact: true,
    },
    {
        path: '/admin/user/person',
        icon: <UserOutlined />,
        title: '用户信息',
        hidden: true,
        exact: true,
    },
    {
        path: '/admin/settings',
        icon: <SettingOutlined />,
        title: '系统配置',
        exact: true,
    },
];

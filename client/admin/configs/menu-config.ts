export default [
    {
        path: '/admin/dashboard',
        title: '仪表盘',
        icon: 'dashboard',
        childMenus: [
            {
                path: '/admin/dashboard/analysis',
                title: '分析页',
            },
        ],
    },
    {
        path: '/admin/content',
        title: '博客管理',
        icon: 'form',
        childMenus: [
            {
                path: '/admin/content/articles',
                title: '文章管理',
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
                childMenus: [
                    {
                        title: '添加分类',
                        path: '/content/categories/edit',
                        exact: true,
                    },
                    {
                        title: '编辑分类',
                        path: '/content/categories/edit/:id',
                        exact: true,
                    },
                ],
            },
            {
                path: '/admin/content/comments',
                title: '评论管理',
                childMenus: [
                    {
                        title: '回复评论',
                        path: '/admin/content/comments/reply/:id',
                        exact: true,
                    },
                ],
            },
        ],
    },
    {
        path: '/admin/code',
        title: '代码管理',
        icon: 'codepen',
        childMenus: [
            {
                path: '/admin/code/demos',
                title: '代码demo',
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
                exact: true,
            },
            {
                path: '/admin/code/static-files/:folderId',
                exact: true,
            },
        ],
    },
    {
        path: '/admin/medias',
        title: '媒体管理',
        icon: 'appstore',
        childMenus: [
            {
                path: '/admin/medias/images',
                title: '图片列表',
                exact: true,
            },
        ],
    },
];

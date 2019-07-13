const isDev = process.env.NODE_ENV !== 'production';

export default {
    server: {
        debug: isDev,
        hostname: 'localhost',
        port: '8080'
    },
    db: {
        uri: isDev ? 'mongodb://localhost:27017/dev' : 'mongodb://db:27017/blog',
        options: {
            user: '',
            pass: ''
        }
    },
    test_db: {
        uri: 'mongodb://localhost:27017/test',
        options: {
            user: '',
            pass: ''
        }
    },
    token_secret_key: 'NODEBLOG/bs32g1038@163.com/TOKEN',
    user: {
        nickName: '冷夜流星',
        email: 'bs32g1038@163.com',
        location: '广东 广州'
    },
    rss: {
        title: '李志成的个人网站',
        link: 'http://www.lizc.me',
        language: 'zh-cn',
        description: '博客小站，专注于web开发，尤其是前端开发。喜欢和同道中人一起搞开发！',
        // 最多获取的RSS Item数量
        max_rss_items: 50
    },
    // 每个访问者一天可以发的评论数
    max_comment_per_day: 100,
    // 每个访问者一天可以发的留言数
    max_guestbook_per_day: 100,
    github_secret_key: 'Github/bs32g1038@163.com/TOKEN'
};

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
    server: {
        debug: isDev,
        hostname: 'localhost',
        port: '8080'
    },
    db: {
        uri: isDev ? 'mongodb://localhost:27017/dev' : 'mongodb://localhost:27017/blog',
        options: {
            user: '',
            pass: '',
        },
    },
    token_secret_key: 'NODEBLOG/bs32g1038@163.com/TOKEN',
    user: {
        account: 'bs32g1038@163.com',
        password: 'lia8651047',
        nickName: '冷夜流星',
        email: 'bs32g1038@163.com',
        location: '广东 广州'
    },
    rss: {
        title: '李志成的个人网站',
        link: 'http://www.lizc.me',
        language: 'zh-cn',
        description: '博客小站，专注于web开发，尤其是前端开发。喜欢和同道中人一起搞开发！',
        //最多获取的RSS Item数量
        max_rss_items: 50
    }
};
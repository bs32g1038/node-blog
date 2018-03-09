const isDev = process.env.NODE_ENV !== 'production';

let config = {
    server: {
        debug: isDev,
        hostname: 'localhost',
        port: isDev ? '8080' : '80'
    },
    db: {
        uri: 'mongodb://localhost:27017/dev',
        options: {
            user: '',
            pass: '',
        },
    },
    token_secret_key: 'NODEBLOG/NODEBLOG-USER/TOKEN',
    session_secret: 'node-blog',
    site: {
        name: 'LIZCBLOG',
        header_code: '',
        description: '夜深人静，一个it前端男，在书桌前的故事...',
        keywords: 'nodejs, node, express, mongoose',
        icp: '粤ICP备16021965号-2',
        domain: 'http://wwww.lizc.me',
        author: {
            nick_name: '冷夜流星',
            email: '845177026@qq.com',
            location: '广东 广州',
            qq: '845177026',
            motto: '时间是一切财富中最宝贵的财富。—— 德奥弗拉斯多',
            github: 'https: //github.com/bs32g1038/node-blog'
        }
    }
}

module.exports = config;
var config = {
    list_post_count: 10,                //文章列表显示的话题数量
    max_comment_per_day: 100,           //每个访问者一天可以发的评论数
    max_guestbook_per_day: 100,         //每个访问者一天可以发的留言数
    max_open_per_day: 1000,             //每个访问者一天可以打开网站的次数，主要用于防止循环攻击
    db: 'mongodb://127.0.0.1/test',     
    session_secret: 'node_club_secret', // 务必修改
    site: {
        key: 'site-info', //关键词用于检索数据
        name: '个人博客',
        logo: '/web/src/asset/logo.jpg',
        icp: '',
        url: 'http://127.0.0.1',
        qr_code: '/web/src/asset/qr-code.png',
        code_header: '',
        code_footer: ''
    },
    //用于初始化管理员数据，init data
    administrator: {
        nick_name: '冷夜流星',
        account: 'admin',               //不支持动态修改
        password: 'admin',              //不支持动态修改
        email: 'bs32g1038@163.com',
        location: '广东',
        qq: '845177026',
        img_url: '',
        motto: 'yourmotoo你的个人格言',
        github: 'https://github.com/bs32g1038/node-blog'
    },
    about: {
        key: 'about', //关键词用于检索数据
        title: '关于我',
        content: '内容为空'
    },
    redis: {
        host: '127.0.0.1',
        port: 6379,
        db: 0,
        cache_expired: "300", //秒
    },
    // 7牛的access信息，用于文件上传
    qn_access: {
        accessKey: 'your access key',
        secretKey: 'your secret key',
        bucket: 'your bucket name',
        origin: 'http://your qiniu domain',
        // if your app outside of China, please set `uploadURL` to `http://up.qiniug.com/`
        //uploadURL: 'http://xxxxxxxx',
    }

}
module.exports = config;
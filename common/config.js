var config = {

    list_post_count: 10,                    //文章列表显示的话题数量

    db: 'mongodb://127.0.0.1/test',

    site: {
        key: 'site-info',                   //关键词用于检索数据
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
        account: 'admin',
        password: 'admin',
        email: 'bs32g1038@163.com',
        location: '广东',
        qq: '845177026',
        img_url: '',
        motto: 'yourmotoo你的个人格言',
        github: 'https://github.com/bs32g1038/node-blog'
    },
    redis: {
        host: '127.0.0.1',
        port: 6379,
        db: 0,
        cache_expired: "300",
    }

}
module.exports = config;


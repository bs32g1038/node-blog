var config = {

    list_post_count: 10,                    //文章列表显示的话题数量

    db: 'mongodb://127.0.0.1/test',

    site: {
        name: '个人博客',
        logo: '',
        icp: '',
    },

    administrator: {
        nick_name: '冷夜流星',
        account: 'admin',
        password: 'admin',
        email: 'bs32g1038@163.com',
        location: '广东',
        qq: '845177026',
        img_url: '',
        motto: 'yourmotoo你的个人格言',
    },
    redis: {
        host: '127.0.0.1',
        port: 6379,
        db: 0,
        cache_expired: "300",
    }

}
module.exports = config;


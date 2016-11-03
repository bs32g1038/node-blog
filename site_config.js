var siteConfig = {
    list_post_count: 10, //文章列表显示的话题数量
    list_guestbook_count: 10,//留言列表显示的数量
    list_comment_count: 10,//评论列表显示的数量
    max_comment_per_day: 100, //每个访问者一天可以发的评论数
    max_guestbook_per_day: 100, //每个访问者一天可以发的留言数
    max_open_per_day: 1000, //每个访问者一天可以打开网站的次数，主要用于防止循环攻击
    site_name: '个人博客',
    site_description: '这是一个个人网站！', //网站描述
    site_keywords: 'nodejs, node, express, mongoose', //网站关键词
    site_logo: '/home/images/logo.jpg',
    site_icp: '', //备案号
    site_domain: 'http://127.0.0.1',
    site_header_code: '',

    // 7牛的access信息，用于文件上传,不填写，则默认本地存储
    qn_accessKey: 'your access key',
    qn_secretKey: 'your secret key',
    qn_bucket: 'your bucket name',
    qn_origin: 'http://your qiniu domain',
    // if your app outside of China, please set `uploadURL` to `http://up.qiniug.com/`
    qn_uploadURL: 'http://xxxxxxxx',

}
module.exports = config;
/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-03-15 21:36:48 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-26 23:54:30
 */

export default {
    debug: true,
    hostname: 'localhost',
    port: 8080,
    redis: {
        host: '127.0.0.1',
        port: 6379,
        password: ''
    },
    db: { // 数据库配置
        uri: 'mongodb://localhost:27017/test',
        options: {
            user: '',
            pass: ''
        }
    },
    admin_role: {
        account: 'admin',
        password: 'admin'
    },
    session_secret: 'test_secret', // 务必修改
    site_setting: {//网站配置
        _id: "582c6bbf4a177ce478eb631c",
        site_header_code: "",
        site_domain: "http://127.0.0.1",
        site_icp: "",
        site_logo: "/web/images/logo.jpg",
        site_keywords: "nodejs, node, express, mongoose",
        site_description: "这是一个个人网站！",
        site_name: "个人博客",
    },
    // 每个访问者一天可以发的评论数
    max_comment_per_day: 100,
    // 每个访问者一天可以发的留言数
    max_guestbook_per_day: 100,
}
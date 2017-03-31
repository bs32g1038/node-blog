/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-03-15 21:36:48
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-25 14:46:34
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    debug: true,
    hostname: 'localhost',
    port: 8080,
    redis: {
        host: '127.0.0.1',
        port: 6379,
        password: ''
    },
    db: {
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
    session_secret: 'test_secret',
    site_setting: {
        _id: "setting",
        site_header_code: "投壶代买信息",
        site_domain: "http://127.0.0.1",
        site_icp: "",
        site_logo: "/web/images/logo.jpg",
        site_keywords: "nodejs, node, express, mongoose",
        site_description: "这是一个个人网站！",
        site_name: "个人博客",
    }
};

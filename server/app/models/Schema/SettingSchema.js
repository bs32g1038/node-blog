"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-03 23:01:44
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-04 19:51:35
 */
const mongoose_1 = require("mongoose");
let setting = new mongoose_1.Schema({
    _id: { type: String, default: 'site_option' },
    site_name: { type: String, default: '个人博客' },
    site_description: { type: String, default: '这是一个个人网站！' },
    site_keywords: { type: String, default: 'nodejs, node, express, mongoose' },
    site_logo: { type: String, default: '/home/images/logo.jpg' },
    site_icp: { type: String, default: '' },
    site_domain: { type: String, default: 'http://127.0.0.1' },
    site_header_code: { type: String, default: '' },
});
exports.default = setting;

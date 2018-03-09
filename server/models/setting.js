/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-03 23:01:44
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-05-18 11:21:42
 */
const mongoose = require("mongoose");
let SettingSchema = new mongoose.Schema({
    site_name: { type: String, default: '个人博客' },
    site_description: { type: String, default: '这是一个个人网站！' },
    site_keywords: { type: String, default: 'nodejs, node, express, mongoose' },
    site_logo: { type: String, default: '/home/images/logo.jpg' },
    site_icp: { type: String, default: '' },
    site_domain: { type: String, default: 'http://127.0.0.1' },
    site_header_code: { type: String, default: '' },
});
module.exports = mongoose.model('setting', SettingSchema, 'setting');

/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-03 23:01:44 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-04 19:51:35
 */
import { Schema } from 'mongoose';

let setting: Schema = new Schema({
    site_name: { type: String, default: '个人博客' },                                // 网站名称
    site_description: { type: String, default: '这是一个个人网站！' },                 // 网站描述
    site_keywords: { type: String, default: 'nodejs, node, express, mongoose' },    // 网站关键词
    site_logo: { type: String, default: '/home/images/logo.jpg' },                  // 网站logo
    site_icp: { type: String, default: '' },                                        // 备案号
    site_domain: { type: String, default: 'http://127.0.0.1' },                     // 域名
    site_header_code: { type: String, default: '' },                                // 用于添加网站统计代码(如：百度统计)
});

export default setting;
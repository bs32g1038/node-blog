/*!
 * site model
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OptionSchema = new Schema({
    _id: {type: String, default: 'options'},

    site_name: {type: String, default: '个人博客'},                                // 网站名称
    site_description: {type: String, default: '这是一个个人网站！'},                 // 网站描述
    site_keywords: {type: String, default: 'nodejs, node, express, mongoose'},    // 网站关键词
    site_logo: {type: String, default: '/home/images/logo.jpg'},                  // 网站logo
    site_icp: {type: String, default: ''},                                        // 备案号
    site_domain: {type: String, default: 'http://127.0.0.1'},                     // 域名
    site_header_code: {type: String, default: ''},                                // 用于添加网站统计代码(如：百度统计)
    list_post_count: {type: Number, default: 10},                                 // 文章列表显示的话题数量
    list_guestbook_count: {type: Number, default: 10},                            // 留言列表显示的数量
    list_comment_count: {type: Number, default: 10},                              // 评论列表显示的数量
    max_comment_per_day: {type: Number, default: 100},                            // 每个访问者一天可以发的评论数
    max_guestbook_per_day: {type: Number, default: 100},                          // 每个访问者一天可以发的留言数
    max_open_per_day: {type: Number, default: 1000},                              // 每个访问者一天可以打开网站的次数，主要用于防止循环攻击
});

var optionModel = mongoose.model('option', OptionSchema, 'option');

module.exports = optionModel;
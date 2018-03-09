/**
 * 渲染增强中间件，负责全局变量和全局函数传入
 * 2018/1/4
 */
const moment = require('moment');
const cache = require('lru-cache')();
const db = require('../models');
const config = require('../config');

moment.locale('zh-cn'); // 使用中文

// 模板基础渲染内容
let base = {
    site: config.site,
    parseTime: function(timestamp, format) {
        return moment(timestamp).format('YYYY-MM-DD HH:MM:SS');
    },
    timeAgo: function(timestamp) {
        return moment(timestamp).fromNow();
    }
}

// 缓存博客分类
async function getAllCategory() {
    let categories = cache.get('all-category');
    if (!categories) {
        categories = await db.Category.find();
        console.log(categories)
        cache.set('all-category', categories, 60 * 60);
    }
    return categories
}

// 增强渲染模板，添加相关函数和全局变量
module.exports = function(req, res, next) {
    res._render = res.render;
    res.render = async function(view, options, fn) {
        Object.assign(options, base, {
            categories: await getAllCategory()
        })
        res._render(view, options, fn);
    };
    next();
};
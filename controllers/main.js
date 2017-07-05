/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-03-26 13:50:25
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-06-11 22:40:57
 */

const LRU = require('lru-cache');
const config = require('../config');

const cache = LRU();

class MainController {
    // 后台admin入口,配合react单页应用
    static async AdminMain(req, res, next) {
        try {
            let setting = await cache.get(config.site_setting._id);
            res.render('admin', { site_name: setting.site_name });
        } catch (error) {
            return next(error);
        }
    }
    // 前台home入口，配合vue使用
    static async HomeMain(req, res, next) {
        try {
            let setting = await cache.get(config.site_setting._id);
            res.renderVueServer('web', { title: setting.site_name });
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = MainController;
var config = require('../config');
var async = require("async");
var Index = require("../dao/index");
var categoryDao = Index.category;
var linkDao = Index.link;
var userDao = Index.user;

exports.initData = function (req, res) {

    async.parallel({
        cats: function (callback) {
            categoryDao.getByQuery({}, null, { sort: { order: 1 } }, callback);
        },
        links: function (callback) {
            linkDao.getByQuery({}, 'name url', { sort: { create_at: -1 } }, callback);
        },
        user: function (callback) {
            userDao.getOneByAcount(config.administrator.account, 'nick_name email qq location github motto img_url', callback)
        },

        site: function (callback) {
            callback(null, config.site);
        }
    }, function (err, data) {
        
        if (err) {
            return res.json({ success: false, error_msg: '页面获取数据错误，请重试！' });
        }

        res.json({ success: true, data: data });

    });

}
var config = require('../config');
var async = require("async");
var Index = require("../dao/index");
var categoryDao = Index.category;
var linkDao = Index.link;
var userDao = Index.user;
var optionDao = Index.option;

exports.initData = function(req, res) {

    async.parallel({
        cats: function(callback) {
            categoryDao.getList({ page: 1, limit: 30 }, callback);
        },
        links: function(callback) {
            linkDao.getList({ page: 1, limit: 10 }, callback);
        },
        user: function(callback) {
            userDao.getByAcount(config.administrator.account, callback)
        },
        site: function(callback) {
            optionDao.getByKey(config.site.key, callback);
        }
    }, function(err, data) {
        if (err) {
            return res.json({ success: false, error_msg: '页面获取数据错误，请重试！' });
        }
        res.json({ success: true, data: data });
    });
}
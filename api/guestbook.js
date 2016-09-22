var tools = require('../common/tools');
var validator = require('validator');
var async = require("async");
var config = require('../common/config');
var redis = require('../common/redis');
var Index = require('../dao/index');
var guestbookDao = Index.guestbook;

exports.index = function (req, res) {

    var page = tools.doPage(req.params.page);

    var limit = config.list_post_count;             //列表显示数目

    async.auto({

        guestbooks: function (callback) {
            guestbookDao.getListByPage({ page: page, query: { pass: true } }, callback);
        },

        count: function (callback) {
            guestbookDao.getSumCountByQuery({ pass: true }, callback);
        },

        pageCount: ['count', function (data, callback) {
            let count = parseInt(data.count) || 0;
            callback(null, Math.ceil(count / limit));
        }],

        curPage: function (callback) {
            callback(null, page);
        }

    }, function (err, data) {
        if (err) {
            return res.json({ success: false, error_msg: '页面获取数据错误，请重试！' });
        }
        res.json({ success: true, data: data });
    });
}

exports.add = function (req, res) {

    var nick_name = validator.trim(req.body.nick_name);
    var email = validator.trim(req.body.email);
    var content = validator.trim(req.body.content);

    if (validator.isNull(nick_name)) {
        return res.json({ success: false, error_msg: '用户名不能为空！' })
    } else if (!validator.isEmail(email)) {
        return res.json({ success: false, error_msg: '邮箱输入不正确' });
    } else if (validator.isNull(content)) {
        return res.json({ success: false, error_msg: '内容不能为空' });
    }

    console.log(nick_name)
    console.log(email)
    console.log(content)

    //添加redis缓存
    redis.hincrby('guestbook:limit', tools.getClientIP(req), 1, 60 * 60 * 24, function (err, num) {

        if (num > config.max_guestbook_per_day) {
            return res.json({ success: false, error_msg: '你今天已经到达最大的留言次数，谢谢你对本博客的支持！' });
        }

        guestbookDao.add({ nick_name, email, content, }, function (err) {

            if (err) {
                return res.json({ success: false, error_msg: '提交留言失败！' });
            }

            res.json({ success: true });
        });
    });
}
var tools = require('../common/tools');
var validator = require('validator');
var moment = require('moment');
var Index = require('../dao/index');
var guestbookDao = Index.guestbook;
var async = require("async");
var config = require('../config')

/***************************留言管理****************************/

exports.b_get_guestbook_list = function(req, res, next) {

    var page = tools.doPage(req.params.page);
    var limit = config.b_guestbook_limits[0];

    async.parallel({
        guestbooks: function(callback) {
            guestbookDao.getList({ page: page, limit: limit }, callback);
        },
        pageCount: function(callback) {
            guestbookDao.count(function(err, sum) {
                return callback(err, Math.ceil(sum / limit));
            })
        }
    }, function(err, data) {
        if (err) {
            return next(err);
        }
        var guestbooks = data.guestbooks.map(function(guestbook) {
            guestbook = guestbook.toObject();
            Object.assign(guestbook, {
                create_at: moment(guestbook.create_at).format('YYYY-MM-DD HH:mm:ss')
            })
            return guestbook;
        })
        return res.render('admin/layout', {
            guestbooks: guestbooks,
            pageCount: data.pageCount,
            curPage: page,
            $body: 'guestbook/list.html'
        });
    });
}

exports.b_guestbook_pass_do = function(req, res, next) {

    var id = req.params.id;

    guestbookDao.updatePass(id, function(err) {
        if (err) {
            return next(err);
        }
        return res.json({ success: true, message: '留言已设置为通过审核' });
    });
}

exports.b_guestbook_reply = function(req, res, next) {

    var id = req.params.id;

    guestbookDao.getById(id, function(err, guestbook) {
        if (err) {
            return next(err);
        }
        return res.render('admin/layout', {
            guestbook: guestbook,
            $body: 'guestbook/reply.html'
        });
    });
}

exports.b_guestbook_reply_do = function(req, res, next) {

    var id = req.params.id;
    var reply_content = validator.trim(req.body.reply);

    guestbookDao.updateById(id, { reply_content: reply_content }, function(err) {
        if(err){
            return next(err);
        }
        return res.redirect('/admin/guestbook/list');
    });
}

/**
 * 留言直接删除
 */
exports.b_guestbook_del = function(req, res, next) {

    var id = req.params.id;

    guestbookDao.deleteById(id, function(err) {
        if (err) {
            return next(err);
        }
        return res.json({ success: true, message: '留言删除成功过！' });
    })

}

exports.b_guestbook_batch_del = function(req, res, next) {

    var ids = req.body.ids; //批量删除

    async.map(ids, function(id, callback) {
        guestbookDao.deleteById(id, callback)
    }, function(err) {
        if (err) {
            return next(err);
        }
        return res.json({ success: true, message: '留言删除成功过！' });
    })
}
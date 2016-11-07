var tools = require('../common/tools');
var validator = require('validator');
var moment = require('moment');
var Index = require('../dao/index');
var guestbookDao = Index.guestbook;
var async = require("async");

/***************************留言管理****************************/

exports.b_get_guestbook_list = function (req, res) {

    var page = tools.doPage(req.params.page);
    var limit = 10;

    async.parallel({
        guestbooks: function (callback) {
            guestbookDao.getList({page: page, limit: limit}, callback);
        },
        pageCount: function (callback) {
            guestbookDao.count(function (err, sum) {
                return callback(err, Math.ceil(sum / limit));
            })
        }
    }, function (err, data) {

        var guestbooks = data.guestbooks.map(function (guestbook) {
            guestbook = guestbook.toObject();
            Object.assign(guestbook, {
                create_at: moment(guestbook.create_at).format('YYYY-MM-DD HH:mm:ss')
            })
            return guestbook;
        })

        res.render('admin/layout', {
            guestbooks: guestbooks,
            pageCount: data.pageCount,
            curPage: page,
            $body: 'guestbook/list.html'
        });

    });
}

exports.b_guestbook_pass_do = function (req, res) {

    var id = req.params.id;

    guestbookDao.updatePass(id, function (err) {
        if (err) {
            res.json({success: false, message: '操作失败！'});
        }
        res.json({success: true, message: '留言已设置为通过审核'});
    });
}

exports.b_guestbook_reply = function (req, res) {

    var id = req.params.id;

    guestbookDao.getById(id, function (err, guestbook) {
        res.render('admin/layout', {
            guestbook: guestbook,
            $body: 'guestbook/reply.html'
        });
    });
}

exports.b_guestbook_reply_do = function (req, res) {

    var id = req.params.id;

    var reply_content = validator.trim(req.body.reply);

    guestbookDao.updateById(id, {reply_content: reply_content}, function () {
        return res.redirect('/admin/guestbook/list');
    });
}

/**
 * 留言直接删除
 */
exports.b_guestbook_del = function (req, res) {

    var id = req.params.id;

    guestbookDao.deleteById(id, function (err) {
        if (err) {
            return res.send({success: false, message: '留言删除失败！'});
        }
        return res.send({success: true, message: '留言删除成功过！'});
    })

}

exports.b_guestbook_batch_del = function (req, res) {

    var ids = req.body.ids; //批量删除

    async.map(ids, function (id, callback) {
        guestbookDao.deleteById(id, callback)
    }, function (err) {
        if (err) {
            return res.send({success: false, message: '留言删除失败！'});
        }
        return res.send({success: true, message: '留言删除成功过！'});
    })
}
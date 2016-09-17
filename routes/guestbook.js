var co = require('co');
var _ = require('lodash');
var tools = require('../common/tools');
var validator = require('validator');

var Index = require('../dao/index');
var guestbookDao = Index.guestbook;


/***************************留言管理****************************/

exports.b_get_guestbook_list = function (req, res) {

    var page = tools.getPage(req.params.page);

    console.log(page)

    guestbookDao.getListByPage({page: page}, function (err, guestbooks) {

        var guestbooks = guestbooks.map(function (guestbook) {

            var guestbook = guestbook.toObject();

            guestbook.create_at = tools.formatDate(guestbook, false);
            return guestbook;
        })

        guestbookDao.getSumCount(function (err, count) {

            res.render('admin/guestbook-list', {
                guestbooks: guestbooks,
                pageCount: tools.getPageCount(count),
                curPage: page
            });
        });

    });

}

exports.b_guestbook_pass_do = function (req, res) {

    var id = req.body.id;

    guestbookDao.updatePass(id, function (err) {

        res.json({
            success: true,
            msg: '留言已设置为通过审核'
        });

    });

}

exports.b_guestbook_reply = function (req, res) {

    var id = req.params.id;

    console.log(id)

    guestbookDao.getById(id, function (err, guestbook) {

        res.render('admin/guestbook-reply', {
            guestbook: guestbook
        });
    });

}

exports.b_guestbook_replyDo = function (req, res) {

    var id = req.params.id;

    var reply_content = validator.trim(req.body.reply);

    guestbookDao.updateById(id, {reply_content: reply_content}, function (err) {

        return res.redirect('/admin/guestbook/list');

    });

}

exports.b_guestbook_del = function (req, res) {

    var id = req.body.id;

    guestbookDao.deleteById(id, function (err) {

        return res.send({
            success: true,
            msg: '目录已经被成功删除'
        });

    })
}



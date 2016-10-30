var tools = require('../common/tools');
var validator = require('validator');
var Index = require('../dao/index');
var postDao = Index.post;
var commentDao = Index.comment;
var async = require("async");
var moment = require('moment');

exports.b_get_comment_list = function (req, res) {

    var page = tools.getPage(req.params.page);
    var limit = 10;

    async.parallel({
        comments: function (callback) {
            commentDao.getList({page: page, limit: limit}, function (err, cmts) {
                async.map(cmts, function (cmt, callback) {
                    cmt = cmt.toObject();
                    async.parallel({
                        post_title: function (callback) {
                            postDao.getTitleById(cmt.post_id, callback)
                        },
                        reply_author: function (callback) {
                            commentDao.getNickNameById(cmt.reply_id, callback);
                        }
                    }, function (err, data) {
                        Object.assign(cmt, {
                            create_at: moment(cmt.create_at).format('YYYY-MM-DD'),
                            post_title: data.post_title,
                            reply_author: data.reply_author
                        })
                        callback(err, cmt)
                    })
                }, callback);
            })
        },
        pageCount: function (callback) {
            commentDao.count(function (err, sum) {
                return callback(err, Math.ceil(sum / limit));
            })
        }
    }, function (err, data) {
        res.render('admin/layout', {
            comments: data.comments,
            curPage: page,
            pageCount: data.pageCount,
            $body: 'comment/list.html'
        });
    })
}

exports.b_comment_pass_do = function (req, res) {

    var id = req.params.id;

    commentDao.getById(id, function (err, comment) {
        postDao.incCommentCount(comment.post_id);
        commentDao.updatePassById(id, function (err) {
            if (err) {
                res.json({success: false, message: '操作失败！'});
            }
            res.json({success: true, message: '评论已经通过审核！'});
        })
    });
}

exports.b_comment_reply = function (req, res) {

    var id = req.params.id;

    commentDao.getById(id, function (err, comment) {
        postDao.getById(comment.post_id, function (err, post) {
            comment.post_title = post.title;
            res.render('admin/layout', {
                comment: comment,
                $body: 'comment/reply.html'
            });
        });
    });
}

exports.b_comment_reply_do = function (req, res) {

    var reply_id = req.params.id;
    var nick_name = "冷夜流星-博主";
    var email = "bs32g1038@163.com";
    var identity = 1;
    var post_id = validator.trim(req.body.post_id);
    var content = validator.trim(req.body.reply);

    var comment = {
        nick_name: nick_name,
        email: email,
        content: content,
        identity: identity,
        post_id: post_id,
        reply_id: reply_id,
        pass: true
    };

    commentDao.add(comment, function (err) {
        postDao.incCommentCount(post_id, function (err) { //评论增加，文章评论数量1
            return res.redirect('/admin/comment/list');
        });
    });

}

exports.b_comment_del = function (req, res) {

    var id = req.params.id;

    commentDao.getById(id, function (err, comment) {
        if (comment.pass) {
            postDao.decCommentCount(comment.post_id);
        }
        commentDao.deleteById(id, function (err) {
            if (err) {
                return res.send({success: false, message: err.message});
            }
            return res.send({success: true, message: '评论删除成功！'});
        });
    })

}

exports.b_comment_batch_del = function (req, res) {

    var ids = req.body.ids; //批量删除

    async.map(ids, function (id, callback) {
        commentDao.getById(id, function (err, comment) {
            if (comment.pass) {
                postDao.decCommentCount(comment.post_id);
            }
            commentDao.deleteById(id, callback);
        })
    }, function (err) {
        if (err) {
            return res.send({success: false, message: err.message});
        }
        return res.send({success: true, message: '评论删除成功！'});
    })

}
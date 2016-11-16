var tools = require('../common/tools');
var validator = require('validator');
var Index = require('../dao/index');
var postDao = Index.post;
var commentDao = Index.comment;
var async = require("async");
var moment = require('moment');
var config = require('../config');

exports.b_get_comment_list = function(req, res, next) {

    var page = tools.doPage(req.params.page);
    var limit = config.b_commment_limits[0];

    async.parallel({
        comments: function(callback) {
            commentDao.getList({ page: page, limit: limit }, function(err, cmts) {
                async.map(cmts, function(cmt, callback) {
                    cmt = cmt.toObject();
                    async.parallel({
                        post_title: function(callback) {
                            postDao.getTitleById(cmt.post_id, callback)
                        },
                        reply_author: function(callback) {
                            commentDao.getNickNameById(cmt.reply_id, callback);
                        }
                    }, function(err, data) {
                        if (err) {
                            return callback(err)
                        }
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
        pageCount: function(callback) {
            commentDao.count(function(err, sum) {
                return callback(err, Math.ceil(sum / limit));
            })
        }
    }, function(err, data) {
        if (err) {
            return next(err);
        }
        res.render('admin/layout', {
            comments: data.comments,
            curPage: page,
            pageCount: data.pageCount,
            $body: 'comment/list.html'
        });
    })
}

exports.b_comment_pass_do = function(req, res, next) {

    var id = req.params.id;

    commentDao.getById(id, function(err, comment) {
        if (err) {
            return next(err);
        }
        if (!comment) {
            return res.json({ success: false, message: '该评论可能已经被删了！' });
        }
        postDao.incCommentCount(comment.post_id);
        commentDao.updatePassById(id, function(err) {
            if (err) {
                return next(err);
            }
            res.json({ success: true, message: '评论已经通过审核！' });
        })
    });
}

exports.b_comment_reply = function(req, res, next) {

    var id = req.params.id;

    commentDao.getById(id, function(err, comment) {
        if (err) {
            return next(err);
        }
        if (!comment) {
            return res.json({ success: false, message: '该评论可能已经被删了！' });
        }
        postDao.getById(comment.post_id, function(err, post) {
            comment.post_title = post && post.title;
            res.render('admin/layout', {
                comment: comment,
                $body: 'comment/reply.html'
            });
        });
    });
}

exports.b_comment_reply_do = function(req, res, next) {

    var reply_id = req.params.id;
    var nick_name = res.locals.current_user.nick_name;
    var email = res.locals.current_user.email;
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

    commentDao.add(comment, function(err) {
        if (err) {
            return next(err)
        }
        postDao.incCommentCount(post_id, function(err) { //评论增加，文章评论数量1
            return res.redirect('/admin/comment/list');
        });
    });

}

exports.b_comment_del = function(req, res, next) {

    var id = req.params.id;

    commentDao.getById(id, function(err, comment) {
        if (err) {
            return next(err);
        }
        if (!comment) {
            return res.json({ success: false, message: '该评论可能已经被删了！' });
        }
        if (comment.pass) {
            postDao.decCommentCount(comment.post_id);
        }
        commentDao.deleteById(id, function(err) {
            if (err) {
                return next(err);
            }
            return res.json({ success: true, message: '评论删除成功！' });
        });
    })

}

exports.b_comment_batch_del = function(req, res, next){

    var ids = req.body.ids; //批量删除

    async.map(ids, function(id, callback) {
        commentDao.getById(id, function(err, comment) {
            if (err) {
                return callback(err);
            }
            if (!comment) {
                return callback(new Error());
            }
            if (comment.pass) {
                postDao.decCommentCount(comment.post_id);
            }
            commentDao.deleteById(id, callback);
        })
    }, function(err) {
        if (err) {
            return next(err);
        }
        return res.json({ success: true, message: '评论删除成功！' });
    })

}
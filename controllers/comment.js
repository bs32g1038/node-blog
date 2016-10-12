var co = require('co');
var tools = require('../common/tools');
var validator = require('validator');
var Index = require('../dao/index');
var postDao = Index.post;
var commentDao = Index.comment;


exports.b_get_commentList = function (req, res) {

    var page = tools.getPage(req.params.page);

    console.log(page)

    commentDao.getListByPage({
        page: page,
        sort: {
            create_at: 1
        }
    }, function (err, cmts) {

        if (err) {
            console.log(err)
        }

        co(function* () {

            var t_cmts = cmts.map(function (cmt) {

                cmt = cmt.toObject();

                cmt.create_at = tools.formatDate(cmt.create_at, false);

                return new Promise(function (resolve, reject) {

                    postDao.getById(cmt.post_id, function (err, doc) {

                        if (err) {
                            return reject(err);
                        }

                        if (doc) {

                            cmt.doc_id = doc._id;

                            cmt.doc_title = doc.title;
                        }

                        commentDao.getById(cmt.reply_id, function (err, result) {

                            if (err) {
                                return reject(err);
                            }

                            if (result) {
                                cmt.reply = result.nick_name;
                            } else {

                                cmt.reply = "";
                            }

                            return resolve(cmt);

                        });

                    });
                });
            });

            return yield t_cmts;

        }).then(function (comments) {

            commentDao.getSumCount(function (err, count) {

                res.render('admin/comment-list', {
                    comments: comments,
                    curPage: page,
                    pageCount: tools.getPageCount(count)
                });

            });


        }, function (err) {
            console.error(err.stack);
        });
    });
}

exports.b_comment_pass_do = function (req, res) {

    var id = req.body.id;

    commentDao.updatePassById(id, function (err) {

        res.json({
            success: true,
            msg: '评论已经通过审核！'
        });

    })

}

exports.b_comment_reply = function (req, res) {

    var id = req.params.id;

    console.log(id)

    commentDao.getById(id, function (err, comment) {

        postDao.getById(comment.post_id, function (err, doc) {

            comment.doc_id = doc._id;

            comment.doc_title = doc.title;

            res.render('admin/comment-reply', {
                comment: comment
            });

        });

    });
}

exports.b_comment_replyDo = function (req, res) {

    var reply_id = req.params.id;

    var nick_name = "冷夜流星-博主";

    var email = "bs32g1038@163.com";

    var identity = 1;

    var doc_id = validator.trim(req.body.doc_id);

    var content = validator.trim(req.body.reply);

    console.log(content + ":" + reply_id + ": " + doc_id)

    var comment = {
        nick_name: nick_name,
        email: email,
        content: content,
        identity: identity,
        post_id: doc_id,
        reply_id: reply_id
    };

    commentDao.add(comment, function (err) {
        postDao.incCommentCount(doc_id, function (err) { //评论增加，文章评论数量1
            console.log(err)
            return res.redirect('/admin/comment-list');
        });
    });

}

exports.b_comment_del = function (req, res) {

    var id = req.body.id;

    var post_id = req.body.post_id;

    commentDao.deleteById(id, function (err) {

        if (err) {
            return res.send('404');
        }

        post.decCommentCount(post_id, function () { //评论删除，文章评论数量-1

            return res.send({
                success: true,
                msg: '目录已经被成功删除'
            });


        });

    });

}
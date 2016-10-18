var tools = require('../common/tools');
var validator = require('validator');
var Index = require('../dao/index');
var postDao = Index.post;
var categoryDao = Index.category;
var commentDao = Index.comment;
var async = require("async");
var config = require('../config');
var moment = require('moment');

exports.index = function(req, res) {

    var page = tools.doPage(req.params.page); //处理页码
    var limit = config.list_post_count; //列表显示数目

    async.parallel({
        docs: function(callback) {
            postDao.getList({ page: page, limit: limit }, callback);
        },
        pageCount: function(callback) {
            postDao.count(function(err, sum) {
                callback(err, Math.ceil(sum / limit));
            });
        },
        curPage: function(callback) {
            callback(null, page);
        }
    }, function(err, data) {
        if (data.docs.length <= 0) {
            return res.json({ success: false, error_msg: '该页并没有数据存在，请重试！' });
        }
        if (err) {
            return res.json({ success: false, error_msg: '页面获取数据错误，请重试！' });
        }
        return res.json({ success: true, data: data });
    });

}


exports.detail = function(req, res) {

    var postId = String(req.params.id);

    if (!validator.isMongoId(postId)) {
        res.status(400);
        return res.json({ success: false, error_msg: '此文章不存在或已被删除。' });
    }

    async.auto({
        post: function(callback) {
            postDao.getByIdAndUpdateVisitCount(postId, callback); //由于重构会导致浏览次数每次多增加1
        },
        category: ['post', function(results, callback) {
            if (!results.post) {
                res.status(404);
                return res.send({ success: false, error_msg: '此文章不存在或已被删除。' });
            }
            var post = results.post;
            categoryDao.getNameByAlias(post.category, function(err, category) {
                callback(err, category);
            });
        }],
        comments: function(callback) {
            commentDao.getListLikePostId(postId, true, function(err, comments) {
                async.map(comments, function(cmt, callback) {
                    commentDao.getById(cmt.reply_id, function(err, result) {
                        if (result) {
                            cmt.reply = result;
                        } else {
                            cmt.reply = "";
                        }
                        return callback(null, cmt);
                    });
                }, function(err, results) {
                    callback(err, results);
                });
            });
        }
    }, function(err, results) {
        if (err) {
            return res.json({ success: false, error_msg: '文章数据错误，可能已经丢失！' });
        }
        let post = results.post.toObject();
        let category = results.category;
        let comments = results.comments;
        Object.assign(post, {
            category_name: category.name,
        });
        res.json({ success: true, data: { post: post, comments: comments } });
    });
}


exports.getListByCategory = function(req, res) {

    var page = tools.doPage(req.params.page);
    var category = String(req.params.category);
    var limit = config.list_post_count; //列表显示数目

    async.parallel({
        docs: function(callback) {
            postDao.getListByCategory(category, { page: page, limit: limit }, callback);
        },
        pageCount: function(callback) {
            categoryDao.getPostCountByAlias(category, function(err, sum) {
                callback(err, Math.ceil(sum / limit));
            });
        },
        curPage: function(callback) {
            callback(null, page);
        }
    }, function(err, data) {

        console.log(data)
        if (data.docs.length <= 0) {
            return res.json({ success: false, error_msg: '该目录下没有文章！' });
        }
        if (err) {
            return res.json({ success: false, error_msg: '页面获取数据错误，请重试！' });
        }

        res.json({ success: true, data: data });
    });
}


/*****************************文章搜索*****************************************/

exports.search = function(req, res) {

    var key = req.query.key;
    var limit = config.list_post_count; //列表显示数目
    var page = tools.doPage(req.query.page);

    async.parallel({
            docs: function(callback) {
                postDao.getSearchResult(key, { page: page, limit: limit }, callback);
            },
            pageCount: function(callback) {
                postDao.getCountByLikeKey(key, function(err, sum) {
                    callback(err, Math.ceil(sum / limit));
                });
            },
            curPage: function(callback) {
                callback(null, page);
            }
        },
        function(err, data) {
            if (data.docs.length <= 0) {
                return res.json({ success: false, error_msg: '没有该关键词的搜索结果！' });
            }
            if (err) {
                return res.json({ success: false, error_msg: '页面获取数据错误，请重试！' });
            }
            res.json({ success: true, data: data });
        });
}

exports.getArchives = function(req, res) {

    var page = tools.doPage(req.query.page);
    var limit = 30;

    async.auto({
        archives: function(callback) {
            postDao.getArchives({ page: page, limit: limit }, function(err, archives) {
                var results = [];
                if (archives) {
                    var len = archives.length;
                    var curYear = moment(archives[0].create_at).year();
                    var t = { year: curYear, posts: [] };
                    for (var i = 0; i < len; i++) {
                        if (curYear <= moment(archives[i].create_at).year()) {
                            t.posts.push(archives[i]);
                        } else {
                            results.push(t);
                            i--;
                            curYear--;
                            t = { year: curYear, posts: [] };
                        }
                    }
                    if (t.posts) {
                        results.push(t);
                    }
                }
                callback(err, results);
            })
        },
        count: function(callback) {
            postDao.count(callback);
        },
        pageCount: ['count', function(data, callback) {
            let count = parseInt(data.count) || 0;
            callback(null, Math.ceil(count / limit));
        }],
        curPage: function(callback) {
            callback(null, page);
        }
    }, function(err, data) {
        if (data.archives.length <= 0) {
            return res.json({ success: false, error_msg: '该页并没有数据存在，请重试！' });
        }
        if (err) {
            return res.json({ success: false, error_msg: '页面获取数据错误，请重试！' });
        }
        return res.json({ success: true, data: data });
    });

}
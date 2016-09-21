"use strict";

var _ = require('lodash');
var tools = require('../common/tools');
var validator = require('validator');
var Index = require('../dao/index');
var postDao = Index.post;
var categoryDao = Index.category;
var commentDao = Index.comment;
var async = require("async");
var config = require('../common/config');


exports.index = function (req, res) {

    var page = tools.doPage(req.params.page);       //处理页码

    var limit = config.list_post_count;             //列表显示数目

    async.parallel({

        docs: function (callback) {
            postDao.getListByPage({page: page}, callback);
        },

        //cats: function (callback) {
        //    categoryDao.getAll(callback);
        //},

        pageCount: function (callback) {
            postDao.getSumCount(function (err, sum) {
                callback(err, Math.ceil(sum / limit));
            });
        },

        curPage: function (callback) {
            callback(null, page);
        }

    }, function (err, data) {

        if (err) {
            return res.json({success: false, error_msg: '页面获取数据错误，请重试！'});
        }

        res.json({success: true, data: data});

    });

}


exports.detail = function (req, res) {

    var postId = String(req.params.id);

    if (!validator.isMongoId(postId)) {
        res.status(400);
        return res.json({success: false, error_msg: '不是有效的文章id'});
    }

    async.auto({

        post: function (callback) {
            postDao.getById(postId, callback);
        },

        category: ['post', function (results, callback) {

            if (!results.post) {
                res.status(404);
                return res.send({success: false, error_msg: '话题不存在'});
            }

            var post = results.post;

            categoryDao.getNameByAlias(post.category, function (err, category) {
                callback(err, category);
            });
        }],

        comments: function (callback) {

            commentDao.getByQuery({post_id: postId, pass: true}, null, null, function (err, comments) {

                async.map(comments, function (cmt, callback) {

                    commentDao.getById(cmt.reply_id, function (err, result) {

                        if (result) {
                            cmt.reply = result;
                        } else {

                            cmt.reply = "";
                        }

                        return callback(null, cmt);

                    });

                }, function (err, results) {
                    callback(err, results);
                });

            });
        }
    }, function (err, results) {

        if (err) {
            return res.json({success: false, error_msg: '文章数据错误，可能已经丢失！'});
        }

        let post = results.post.toObject();
        let category = results.category;
        let comments = results.comments;

        Object.assign(post, {
            category_name: category.name,
        });

        res.json({success: true, data: {post: post, comments: comments}});

    });

}


exports.getListByCategory = function (req, res) {

    var page = tools.doPage(req.params.page);
    var category = String(req.params.category);
    var limit = config.list_post_count;             //列表显示数目

    async.parallel({

            docs: function (callback) {
                postDao.getListByPage({query: {category: category}, page: page}, callback);
            },

            pageCount: function (callback) {
                categoryDao.getPostCountByAlias(category, function (err, sum) {
                    callback(err, Math.ceil(sum / limit));
                });
            },

            curPage: function (callback) {
                callback(null, page);
            }

        },
        function (err, data) {

            if (err) {
                return res.json({success: false, error_msg: '页面获取数据错误，请重试！'});
            }

            res.json({success: true, data: data});
        });
}

/*****************************文章搜索*****************************************/

exports.search = function (req, res) {

    var key = req.query.key;
    var limit = config.list_post_count;             //列表显示数目
    var page = tools.doPage(req.query.page);

    async.parallel({

            docs: function (callback) {
                postDao.getListByPage({
                    page: page, query: {title: {$regex: key + ''}}
                }, callback);
            },

            pageCount: function (callback) {
                postDao.getSumCountByQuery({title: {$regex: key + ''}}, function (err, sum) {

                    let count;

                    if (err) {
                        return callback(err, null);
                    }

                    count = parseInt(sum) || 0;

                    callback(null, Math.ceil(count / limit));

                });
            },

            curPage: function (callback) {
                callback(null, page);
            }

        },
        function (err, data) {

            if (err) {
                return res.json({success: false, error_msg: '页面获取数据错误，请重试！'});
            }

            res.json({success: true, data: data});
        });

}

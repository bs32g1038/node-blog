var _ = require('lodash');
var tools = require('../common/tools');
var validator = require('validator');
var Index = require('../dao/index');
var async = require("async");
var postDao = Index.post;
var categoryDao = Index.category;
var mediaDao = Index.media;
var moment = require('moment');
var config = require('../config')
var path = require('path');

/**
 * 后台获取文章列表
 * @param req
 * @param res
 */
exports.b_doc_list = function(req, res, next) {

    var page = tools.doPage(req.params.page);
    var limit = config.b_post_limits[0];

    async.parallel({
            docs: function(callback) {
                postDao.getList({ page: page, limit: limit }, callback);
            },
            cats: function(callback) {
                categoryDao.getAll(callback);
            },
            pageCount: function(callback) {
                postDao.count(function(err, sum) {
                    callback(err, Math.ceil(sum / limit));
                });
            },
        },
        function(err, data) {
            if (err) {
                return next(err);
            }
            var docs = data.docs.map(function(doc) {
                doc = doc.toObject();
                var cat = _.find(data.cats, {
                    alias: doc.category
                });
                Object.assign(doc, {
                    category_name: cat.name,
                    create_at: moment(doc.create_at).format('YYYY-MM-DD HH:mm:ss')
                })
                return doc;
            });
            return res.render('admin/layout', {
                docs: docs,
                pageCount: data.pageCount,
                curPage: data.page,
                $body: 'doc/list.html'
            });

        });
}

/**
 * 后台文章发布请求
 * @param req
 * @param res
 */
exports.b_doc_publish = function(req, res, next) {

    categoryDao.getAll(function(err, cats) {
        if (err) {
            return next(err);
        }
        return res.render('admin/layout', {
            doc: {},
            cats: cats,
            $body: 'doc/edit.html'
        });
    });
}

/**
 * 文章发布处理
 * @param req
 * @param res
 * @returns {*}
 */
exports.b_doc_publish_do = function(req, res, next) {

    let editError; //用于验证

    let { title, from, img_url, category, is_draft, summary, content } = req.body;

    var doc;

    //去除无用空格
    title = validator.trim(title);
    from = validator.trim(from);
    img_url = validator.trim(img_url);
    category = validator.trim(category);
    is_draft = validator.trim(is_draft);
    summary = validator.trim(summary);
    content = validator.trim(content);

    if (title === '') {
        editError = '文章标题不能是空的。';
    } else if (!validator.isInt(from, { min: 1, max: 2 })) {
        editError = '警告，不要随意擅改页面数据！！';
    }

    is_draft = validator.equals(is_draft, "1");

    var regLink = /!\[([^\]<>]+)\]\(([^ \)<>]+)("[^\(\)\"]+")?\)/g;
    var stra, media = [path.basename(img_url)];
    while ((stra = regLink.exec(content)) !== null) {
        media.push(path.basename(stra[2]));
    }

    doc = { title, from, img_url, category, is_draft, summary, content };

    if (editError) {
        return categoryDao.getAll(function(err, cats) {
            res.render('admin/layout', {
                doc: doc,
                cats: cats,
                editError: editError,
                $body: 'doc/edit.html'
            });
        });
    }

    async.parallel([
            function(callback) {
                postDao.add(doc, function(err, post) {
                    if (err) {
                        return callback(err);
                    }
                    async.map(media, function(media_name, callback) {
                        mediaDao.updateAllQuoteByFileName(media_name, post._id, callback)
                    }, callback);
                })
            },
            function(callback) {
                categoryDao.incPostCountByAlias(category, callback)
            }
        ],
        function(err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/admin/doc/list');
        });

}

exports.b_doc_edit = function(req, res, next) {

    var id = req.params.id;

    async.parallel({
        doc: function(callback) {
            postDao.getById(id, callback)
        },
        cats: function(callback) {
            categoryDao.getAll(callback)
        }
    }, function(err, data) {
        if (err) {
            return next(err);
        }
        res.render('admin/layout', {
            doc: data.doc,
            cats: data.cats,
            action: 'edit',
            $body: 'doc/edit.html'
        });

    });
}

exports.b_doc_edit_do = function(req, res, next) {

    var id = req.params.id;

    var editError;

    let { title, from, img_url, category, is_draft, summary, content } = req.body;

    var doc;

    title = validator.trim(title);
    from = validator.trim(from);
    img_url = validator.trim(img_url);
    category = validator.trim(category);
    is_draft = validator.trim(is_draft);
    summary = validator.trim(summary);
    content = validator.trim(content);

    if (title === '') {
        editError = '文章标题不能是空的。';
    } else if (!validator.isInt(from, { min: 1, max: 2 })) {
        editError = '警告，不要随意擅改页面数据！！';
    }

    is_draft = validator.equals(is_draft, "1");

    var regLink = /!\[([^\]<>]+)\]\(([^ \)<>]+)("[^\(\)\"]+")?\)/g;
    var stra, media = [path.basename(img_url)];
    while ((stra = regLink.exec(content)) !== null) {
        media.push(path.basename(stra[2]));
    }

    var update_at = Date.now();

    doc = { title, from, img_url, category, is_draft, summary, content, update_at };

    if (editError) {
        return categoryDao.getAll(function(err, cats) {
            res.render('admin/doc-publish', {
                doc: doc,
                cats: cats,
                action: 'edit',
                editError: editError,
            });
        });
    }

    mediaDao.updateAllQuoteToNull(id, function(err) {
        if (err) {
            return next(err);
        }
        postDao.getById(id, function(err, post) {
            if (err) {
                return next(err);
            }
            if (!post) {
                return res.json({ success: false, message: '警告，不要随意修改id！' });
            }
            var old_category = post.category;
            async.parallel([
                    function(callback) {
                        postDao.updateById(id, doc, function(err) {
                            if (err) {
                                return callback(err);
                            }
                            async.map(media, function(media_name, callback) {
                                mediaDao.updateAllQuoteByFileName(media_name, id, callback)
                            }, callback);
                        })
                    },
                    function(callback) {
                        categoryDao.incPostCountByAlias(category, callback)
                    },
                    function(callback) {
                        categoryDao.decPostCountByAlias(old_category, callback);
                    }
                ],
                function(err) {
                    if (err) {
                        return next(err);
                    }
                    return res.redirect('/admin/doc/list');
                });
        });
    });

}

/**
 * 设置推荐
 * @param req
 * @param res
 */
exports.b_doc_recommend_do = function(req, res, next) {

    var id = req.params.id;

    if (!validator.isMongoId(id)) {
        res.status(400);
        return res.json({ success: false, message: '此文章不存在或已被删除。' });
    }

    var is_recommend = validator.equals(req.body.is_recommend, "1")

    postDao.updateById(id, { is_recommend: is_recommend }, function(err) {
        if (err) {
            return next(err);
        }
        return res.json({
            success: true,
            message: is_recommend ? '文章被设置为推荐' : '文章被设置为不推荐'
        });
    });
}

/**
 * 删除文章，采用软删除
 * @param req
 * @param res
 */
exports.b_doc_del = function(req, res, next) {

    //删除文章，分类目录post_count减1

    var id = req.params.id; //单个删除

    postDao.getById(id, function(err, doc) {
        if (err) {
            return next(err);
        }
        if (!doc) {
            return res.json({ success: false, message: '此文章不存在或已被删除。' });
        }
        categoryDao.decPostCountByAlias(doc.category);
        doc.is_deleted = true;
        doc.save(function(err) {
            if (err) {
                return next(err);
            }
            return res.json({ success: true, message: '文章已经被成功删除' });
        });
    });

}

exports.b_doc_batch_del = function(req, res, next) {

    var ids = req.body.ids; //批量删除

    async.map(ids, function(id, callback) {
        postDao.getById(id, function(err, doc) {
            if (err) {
                return next(err)
            }
            if (!doc) {
                callback({ success: false, message: '此文章不存在或已被删除。' })
            }
            categoryDao.decPostCountByAlias(doc.category);
            doc.is_deleted = true;
            doc.save(callback);
        });
    }, function(err) {
        if (err) {
            return next(err);
        }
        return res.json({ success: true, message: '文章已经被成功删除' });
    });

}
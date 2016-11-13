var _ = require('lodash');
var tools = require('../common/tools');
var validator = require('validator');
var Index = require('../dao/index');
var async = require("async");
var postDao = Index.post;
var categoryDao = Index.category;
var moment = require('moment');
var config = require('../config')

/**
 * 后台获取文章列表
 * @param req
 * @param res
 */
exports.b_doc_list = function (req, res) {

    var page = tools.doPage(req.params.page);

    var limit = config.list_post_count;

    async.parallel({
            docs: function (callback) {
                postDao.getList({page: page, limit: limit}, callback);
            },
            cats: function (callback) {
                categoryDao.getAll(callback);
            },
            pageCount: function (callback) {
                postDao.count(function (err, sum) {
                    callback(err, Math.ceil(sum / limit));
                });
            },
        },
        function (err, data) {

            var docs = data.docs.map(function (doc) {
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

            res.render('admin/layout', {
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
exports.b_doc_publish = function (req, res) {

    categoryDao.getAll(function (err, cats) {

        if (err) {
            return res.send('404');
        }

        res.render('admin/layout', {
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
exports.b_doc_publish_do = function (req, res) {

    let editError; //用于验证

    let { title, from, custom_url, img_url, category, is_draft, summary, content } = req.body;

    var doc;

    //去除无用空格
    title = validator.trim(title);
    from = validator.trim(from);
    custom_url = validator.trim(custom_url);
    img_url = validator.trim(img_url);
    category = validator.trim(category);
    is_draft = validator.trim(is_draft);
    summary = validator.trim(summary);
    content = validator.trim(content);

    if (title === '') {
        editError = '文章标题不能是空的。';
    } else if (!validator.isInt(from, {min: 1, max: 2})) {
        editError = '警告，不要随意擅改页面数据！！';
    } else if (custom_url !== '' && !validator.isURL(custom_url)) {
        editError = 'URL填写不正确。';
    }

    is_draft = validator.equals(is_draft, "1");

    doc = {title, from, custom_url, img_url, category, is_draft, summary, content};

    if (editError) {
        return categoryDao.getAll(function (err, cats) {
            res.render('admin/layout', {
                doc: doc,
                cats: cats,
                editError: editError,
                $body: 'doc/edit.html'
            });
        });
    }

    async.parallel([
            function (callback) {
                postDao.add(doc, callback)
            },
            function (callback) {
                categoryDao.incPostCountByAlias(category, callback)
            }
        ],
        function (err) {
            if (err) {
                return res.send('404');
            }
            return res.redirect('/admin/doc/list');
        });

}


/**
 * 文章编辑请求
 * @param req
 * @param res
 */
exports.b_doc_edit = function (req, res) {

    var id = req.params.id;

    if (!validator.isMongoId(id)) {
        return res.render404('此文章不存在或已被删除。');
    }

    async.parallel({
        doc: function (callback) {
            postDao.getById(id, callback)
        },
        cats: function (callback) {
            categoryDao.getAll(callback)
        }
    }, function (err, data) {

        res.render('admin/layout', {
            doc: data.doc,
            cats: data.cats,
            action: 'edit',
            $body: 'doc/edit.html'
        });

    });
}

/**
 * 文章编辑提交处理
 */
exports.b_doc_edit_do = function (req, res) {

    var id = req.params.id;

    var editError;

    let { title, from, custom_url, img_url, category, is_draft, summary, content } = req.body;

    var doc;

    //去除无用空格
    title = validator.trim(title);
    from = validator.trim(from);
    custom_url = validator.trim(custom_url);
    img_url = validator.trim(img_url);
    category = validator.trim(category);
    is_draft = validator.trim(is_draft);
    summary = validator.trim(summary);
    content = validator.trim(content);

    if (!validator.isMongoId(id)) {
        res.status(400);
        editError = '此文章不存在或已被删除。';
    } else if (title === '') {
        editError = '文章标题不能是空的。';
    } else if (!validator.isInt(from, {min: 1, max: 2})) {
        editError = '警告，不要随意擅改页面数据！！';
    } else if (custom_url !== '' && !validator.isURL(custom_url)) {
        editError = 'URL填写不正确。';
    }

    is_draft = validator.equals(is_draft, "1");

    doc = {title, from, custom_url, img_url, category, is_draft, summary, content};

    if (editError) {
        return categoryDao.getAll(function (err, cats) {
            res.render('admin/doc-publish', {
                doc: doc,
                cats: cats,
                action: 'edit',
                editError: editError,
            });
        });
    }

    postDao.getById(id, function (err, post) {
        if (err) {
            return res.send('404');
        }
        if (!post) {
            return res.json({success: false, message: '警告，不要随意修改id！'});
        }
        var old_category = post.category;
        async.parallel([
                function (callback) {
                    postDao.updateById(id, doc, callback)
                },
                function (callback) {
                    categoryDao.incPostCountByAlias(category, callback)
                },
                function (callback) {
                    categoryDao.decPostCountByAlias(old_category, callback);
                }
            ],
            function (err) {
                if (err) {
                    return res.send('404');
                }
                return res.redirect('/admin/doc/list');
            });
    });
}

/**
 * 设置推荐
 * @param req
 * @param res
 */
exports.b_doc_recommend_do = function (req, res) {

    var id = req.params.id;

    if (!validator.isMongoId(id)) {
        res.status(400);
        return res.json({success: false, message: '此文章不存在或已被删除。'});
    }

    var is_recommend = validator.equals(req.body.is_recommend, "1")

    postDao.updateById(id, {is_recommend: is_recommend}, function (err) {

        if (err) {
            return res.json({
                success: false,
                message: '操作失败'
            });
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
exports.b_doc_del = function (req, res) {

    //删除文章，分类目录post_count减1

    var id = req.params.id; //单个删除

    if (!validator.isMongoId(id)) {
        res.status(400);
        return res.json({success: false, message: '此文章不存在或已被删除。'});
    }

    postDao.getById(id, function (err, doc) {
        if (!doc) {
            return res.send({success: false, message: '此文章不存在或已被删除。'});
        }
        categoryDao.decPostCountByAlias(doc.category);
        doc.is_deleted = true;
        doc.save(function (err) {
            if (err) {
                return res.send({success: false, message: err.message});
            }
            return res.send({success: true, message: '文章已经被成功删除'});
        });
    });

}

exports.b_doc_batch_del = function (req, res) {

    var ids = req.body.ids; //批量删除

    async.map(ids, function (id, callback) {
        if (!validator.isMongoId(id)) {
            res.status(400);
            return res.json({success: false, message: '此文章不存在或已被删除。'});
        }
        postDao.getById(id, function (err, doc) {
            if (!doc) {
                callback({success: false, message: '此文章不存在或已被删除。'})
            }
            categoryDao.decPostCountByAlias(doc.category);
            doc.is_deleted = true;
            doc.save(callback);
        });
    }, function (err) {
        if (err) {
            return res.json({success: false, message: err.message});
        }
        return res.json({success: true, message: '文章已经被成功删除'});
    });

}
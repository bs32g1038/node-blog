var co = require('co');
var _ = require('lodash');
var tools = require('../common/tools');
var validator = require('validator');
var Index = require('../dao/index');

var postDao = Index.post;
var categoryDao = Index.category;
var tagDao = Index.tag;

/**
 * 后台获取文章列表
 * @param req
 * @param res
 */
exports.b_getDocList = function (req, res) {

    var page = tools.getPage(req.params.page);

    var start = new Date();

    co(function* () {

        var res = yield {

            docs: new Promise(function (resolve, reject) {

                postDao.getListByPage({
                    page: page
                }, function (err, docs) {

                    if (err) {
                        return reject(err);
                    }

                    return resolve(docs);

                });
            }),
            cats: new Promise(function (resolve, reject) {

                categoryDao.getAll(function (err, cats) {

                    if (err) {
                        return reject(err);
                    }

                    return resolve(cats);
                });
            }),
            pageCount: new Promise(function (resolve, reject) {

                postDao.getSumCount(function (err, count) {

                    if (err) {
                        return reject(err)
                    }

                    return resolve(tools.getPageCount(count));

                });

            })
        };

        return res;

    }).then(function (obj) {

        var pageCount = obj.pageCount;

        var docs = obj.docs.map(function (doc) {

            var d = doc.toObject();

            var cat = _.find(obj.cats, {alias: doc.category});

            d.category_name = cat.name;

            d.create_at = tools.formatDate(doc.create_at, false);

            return d;

        });

        console.log(new Date() - start);

        res.render('admin/doc-list', {
            docs: docs,
            pageCount: pageCount,
            curPage: page
        });


    }, function (err) {
        console.error(err.stack);
    });
}
/**
 * 后台文章发布请求
 * @param req
 * @param res
 */
exports.b_doc_publish = function (req, res) {

    console.log("输出")

    categoryDao.getAll(function (err, cats) {

        if (err) {
            return res.send('404');
        }
        
        res.render('admin/doc-publish', {
            doc: {},
            cats: cats
        });

    });

}


/**
 * 文章编辑请求
 * @param req
 * @param res
 */
exports.b_docEdit = function (req, res) {

    req.session.flag = "lzc200";

    co(function* () {

        var res = yield {

            doc: new Promise(function (resolve, reject) {


                postDao.getById(req.params.id, function (err, doc) {

                    if (err) {
                        return reject(err);
                    }

                    return resolve(doc);

                });
            }),
            cats: new Promise(function (resolve, reject) {

                categoryDao.getAll(function (err, cats) {

                    if (err) {
                        return reject(err);
                    }

                    return resolve(cats);
                });
            })
        };

        return res;

    }).then(function (obj) {

        req.session.doc_edit_category_id = obj.doc._id;

        res.render('admin/doc-publish', {
            doc: obj.doc,
            cats: obj.cats,
            action: 'edit',
            flag: req.session.flag
        });

    }, function (err) {
        console.error(err.stack);
    });

}

/***************************************文章编辑处理**********************************************/

exports.b_doc_edit_do = function (req, res) {

    var id = req.params.id;

    var editError;

    let { title, from, custom_url, img_url, category, is_draft, summary, content, tags } = req.body;

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
    tags = validator.trim(tags);

    if (title === '') {
        editError = '文章标题不能是空的。';
    } else if (tags === '') {
        editError = '标签不能是空的。';
    } else if (!validator.isInt(from, {min: 1, max: 2})) {
        editError = '警告，不要随意擅改页面数据！！';
    } else if (custom_url !== '' && !validator.isURL(custom_url)) {
        editError = 'URL填写不正确。';
    }

    is_draft = validator.equals(is_draft, "1");

    doc = {title, from, custom_url, img_url, category, is_draft, summary, content, tags};

    if (editError) {

        return categoryDao.getAll(function (err, cats) {

            res.render('admin/doc-publish', {
                doc: doc,
                cats: cats,
                action: 'edit',
                editError: editError,
                flag: req.session.flag
            });

        });
    }

    console.log(doc.tags)

    doc.tags = tags.split(',');

    console.log(doc.tags)


    postDao.updateById(id, doc, function (err) {

            if (err) {

            }

            postDao.getById(id, function (err, doc) {

                //目录文章数量自减
                categoryDao.decPostCountByAlias(doc.category, function (err) {
                });

                //目录文章数量自增
                categoryDao.incPostCountByAlias(category, function (err) {
                });

            });

            doc.tags.map(function (name) {

                tagDao.getOneByName(name, function (err, tag) {

                    if (!tag) {

                        tagDao.add({
                            name: name,
                            post_count: 1
                        }, function (err) {

                        })

                    } else {
                        tagDao.incPostCountByName(name);
                    }
                })
            });

        }
    );

    return res.redirect('/admin/doc-list');

}

/**
 * 文章发布处理
 * @param req
 * @param res
 * @returns {*}
 */
exports.b_doc_publish_do = function (req, res) {

    let editError;         //用于验证

    let { title, from, custom_url, img_url, category, is_draft, summary, content, tags } = req.body;

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
    tags = validator.trim(tags);

    if (title === '') {
        editError = '文章标题不能是空的。';
    } else if (tags === '') {
        editError = '标签不能是空的。';
    } else if (!validator.isInt(from, {min: 1, max: 2})) {
        editError = '警告，不要随意擅改页面数据！！';
    } else if (custom_url !== '' && !validator.isURL(custom_url)) {
        editError = 'URL填写不正确。';
    }

    is_draft = validator.equals(is_draft, "1");

    doc = {title, from, custom_url, img_url, category, is_draft, summary, content, tags};

    if (editError) {
        return categoryDao.getAll(function (err, cats) {
            res.render('admin/doc-publish', {
                doc: doc,
                cats: cats,
                editError: editError
            });
        });
    }

    //划分标签
    doc.tags = tags.split(',');

    postDao.add(doc, function (err) {       ///保存数据

        if (!is_draft) {

            categoryDao.incPostCountByAlias(category, function (err) {
            });     //目录文章数量自增

            doc.tags.map(function (name) {

                tagDao.getOneByName(name, function (err, tag) {

                    if (!tag) {

                        tagDao.add({
                            name: name,
                            post_count: 1
                        }, function (err) {

                        })

                    } else {
                        tagDao.incPostCountByName(name);
                    }
                })
            })
        }
    });

    return res.redirect('/admin/doc-list');

}



/**
 * 设置推荐
 * @param req
 * @param res
 */
exports.b_doc_recommendDo = function (req, res) {

    var id = req.body.id;

    var is_recommend = req.body.is_recommend;

    if (validator.equals(is_recommend, "1")) {

        postDao.updateById(id, {is_recommend: true}, function (err, raw) {

            return res.send({
                success: true,
                msg: '文章被设置为推荐'
            });

        });

    } else {

        postDao.updateById(id, {is_recommend: false}, function (err, raw) {
            return res.send({
                success: true,
                msg: '文章被设置为不推荐'
            });
        });
    }

}

/**
 * 删除文章
 * @param req
 * @param res
 */
exports.b_doc_Del = function (req, res) {

    var id = req.body.id;

    postDao.getById(id, function (err, doc) {

        postDao.deleteById(id, function (err) {

            if (err) {
                return res.send('404');
            }

            //目录文章数量自减
            categoryDao.decPostCountByAlias(doc.category, function () {
            });

            doc.tags.map(function (name) {

                console.log(name + "：数量")

                tagDao.decPostCountByName(name, function () {
                });

            });

            return res.send({
                success: true,
                msg: '文章已经被成功删除'
            });

        });

    });

}





var validator = require('validator');
var Index = require('../dao/index');
var tools = require('../common/tools');
var categoryDao = Index.category;
var async = require("async");
var config = require('../config');

exports.b_get_category_list = function(req, res, next) {

    var page = tools.doPage(req.params.page);
    var limit = config.b_category_limits[0];

    async.parallel({
        cats: function(callback) {
            categoryDao.getList({ page: page, limit: limit }, callback)
        },
        pageCount: function(callback) {
            categoryDao.count(function(err, sum) {
                return callback(err, Math.ceil(sum / limit));
            })
        }
    }, function(err, data) {
        if (err) {
            return next(err);
        }
        res.render('admin/layout', {
            cats: data.cats,
            curPage: page,
            pageCount: data.pageCount,
            $body: 'category/list.html'
        });
    })
}


exports.b_category_add = function(req, res, next) {

    var name = validator.trim(req.body.name);
    var alias = validator.trim(req.body.alias);

    categoryDao.add({ name: name, alias: alias }, function(err) {
        if (err) {
            return next(err);
        }
        return res.redirect('/admin/category/list');
    });

}

exports.b_category_edit_do = function(req, res, next) {

    var id = req.params.id;
    var name = validator.trim(req.body.name);

    categoryDao.updateById(id, { name: name }, function(err) {
        if (err) {
            return next(err);
        }
        return res.redirect('/admin/category/list');
    });

}

exports.b_category_del = function(req, res, next) {

    var id = req.params.id;

    categoryDao.deleteById(id, function(err) {
        if (err) {
            return next(err);
        }
        return res.json({ success: true, message: '目录已经被成功删！' });
    });

}

exports.b_category_batch_del = function(req, res, next) {

    var ids = req.body.ids; //批量删除

    async.map(ids, function(id, callback) {
        categoryDao.deleteById(id, callback);
    }, function(err) {
        if (err) {
            return next(err);
        }
        return res.json({ success: true, message: '目录已经被成功删！' });
    })
}

// 目录显示顺序的提升
exports.b_category_up = function(req, res, next) {

    var id = req.params.id;

    categoryDao.decOrderById(id, function(err) {
        if (err) {
            return next(err);
        }
        return res.json({ success: true, message: '目录已经被提升' });
    })
}

// 目录显示顺序的下降
exports.b_category_down = function(req, res, next) {

    var id = req.params.id;

    categoryDao.incOrderById(id, function(err) {
        if (err) {
            return next(err);
        }
        return res.json({ success: true, message: '目录已经被下降' });
    })
}
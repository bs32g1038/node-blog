var validator = require('validator');
var Index = require('../dao/index');
var tools = require('../common/tools');
var categoryDao = Index.category;
var async = require("async");

exports.b_get_category_list = function(req, res) {

    var page = tools.getPage(req.params.page);
    var limit = 60;

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
        res.render('admin/layout', {
            cats: data.cats,
            curPage: page,
            pageCount: data.pageCount,
            $body: 'category/list.html'
        });
    })
}


exports.b_category_add = function(req, res) {

    var name = validator.trim(req.body.name);
    var alias = validator.trim(req.body.alias);

    categoryDao.add({ name: name, alias: alias }, function() {
        return res.redirect('/admin/category/list');
    });

}

exports.b_category_Del = function(req, res) {

    var id = req.body.id;
    var ids = req.body.ids; //批量删除

    if (id) {
        categoryDao.deleteById(id, function(err) {
            if (err) {
                res.send({ success: false, message: '目录删除失败！' });
            }
            return res.send({ success: true, message: '目录已经被成功删！' });
        });
    } else if (ids) {
        async.map(ids, function(id, callback) {
            categoryDao.deleteById(id, callback);
        }, function(err) {
            if (err) {
                res.send({ success: false, message: '目录删除失败！' });
            }
            return res.send({ success: true, message: '目录已经被成功删！' });
        })
    }

}

//目录显示顺序的提升
exports.b_category_up = function(req, res) {

    var id = req.body.id;

    categoryDao.decOrderById(id, function(err) {
        if (err) {
            return res.send({ success: false, message: '目录已经处于顶级' });
        }
        return res.send({ success: true, message: '目录已经被提升' });
    })
}

//目录显示顺序的下降
exports.b_category_down = function(req, res) {

    var id = req.body.id;

    categoryDao.incOrderById(id, function() {
        return res.send({ success: true, message: '目录已经被下降' });
    })
}
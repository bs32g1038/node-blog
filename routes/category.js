var co = require('co');
var _ = require('lodash');
var tools = require('../common/tools');
var validator = require('validator');
var config = require('../common/config');

var Index = require('../dao/index');
var categoryDao = Index.category;


exports.b_get_category_list = function (req, res) {

    categoryDao.getByQuery({}, null, {sort: {order: 1}}, function (err, cats) {

        res.render('admin/category-list', {
            flag: "lzc200",
            cats: cats
        });

    });

}

exports.b_category_add = function (req, res) {

    var name = validator.trim(req.body.name);
    var alias = validator.trim(req.body.alias);

    categoryDao.add({
        name: name,
        alias: alias
    }, function (err) {

        return res.redirect('/admin/category-list');
    });

}

exports.b_category_Del = function (req, res) {

    var id = validator.trim(req.body.id);

    categoryDao.deleteById(id, function (err, raw) {

        if (err) {
            return res.send('404');
        }

        return res.send({
            success: true,
            msg: '目录已经被成功删除'
        });

    });

}

//目录显示顺序的提升
exports.b_category_up = function (req, res) {

    var id = req.body.id;

    categoryDao.decOrderById(id, function (err) {

        console.log(err)

        if (err) {
            return res.send({
                success: false,
                msg: '目录已经处于顶级'
            });
        }

        return res.send({
            success: true,
            msg: '目录已经被提升'
        });
    })
}

//目录显示顺序的下降
exports.b_category_down = function (req, res) {

    var id = req.body.id;

    categoryDao.incOrderById(id, function (err) {

        console.log(err)

        return res.send({
            success: true,
            msg: '目录已经被下降'
        });
    })
}
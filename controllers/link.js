var Index = require('../dao/index');
var linkDao = Index.link;
var async = require("async");
var tools = require('../common/tools');
var config = require('../config');
var validator = require('validator');

exports.b_get_link_list = function(req, res, next) {

    var page = tools.doPage(req.params.page);
    var limit = config.b_link_limits[0];

    async.parallel({
        links: function(callback) {
            linkDao.getList({ page: page, limit: limit }, callback)
        },
        pageCount: function(callback) {
            linkDao.count(function(err, sum) {
                return callback(err, Math.ceil(sum / limit));
            })
        }
    }, function(err, data) {
        if (err) {
            return next(err);
        }
        return res.render('admin/layout', {
            links: data.links,
            curPage: page,
            pageCount: data.pageCount,
            $body: 'link/list.html'
        });
    })
}

exports.b_link_add = function(req, res, next) {

    var name = validator.trim(req.body.name);
    var url = validator.trim(req.body.url);

    linkDao.add({ name: name, url: url }, function(err) {
        if (err) {
            return next(err);
        }
        return res.redirect('/admin/link/list');
    });
}

exports.b_link_edit_do = function(req, res, next) {

    var id = req.params.id;
    var name = validator.trim(req.body.name);
    var url = validator.trim(req.body.url);

    linkDao.updateById(id, { name: name, url: url }, function(err) {
        if (err) {
            return next(err);
        }
        return res.redirect('/admin/link/list');
    });
}

exports.b_link_del = function(req, res, next) {

    var id = req.params.id;

    linkDao.deleteById(id, function(err) {
        if (err) {
            return next(err);
        }
        return res.json({ success: true, message: '链接已经被成功删除' });
    });

}

exports.b_link_batch_del = function(req, res, next) {

    var ids = req.body.ids; //批量删除

    async.map(ids, function(id, callback) {
        linkDao.deleteById(id, callback);
    }, function(err) {
        if (err) {
            return next(err);
        }
        return res.json({ success: true, message: '链接已经被成功删除' });
    })

}
var Index = require('../dao/index');
var linkDao = Index.link;
var async = require("async");
var tools = require('../common/tools');

exports.b_get_link_list = function(req, res) {

    var page = tools.getPage(req.params.page);
    var limit = 50;

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
        res.render('admin/layout', {
            links: data.links,
            curPage: page,
            pageCount: data.pageCount,
            $body: 'link/list.html'
        });
    })
}

exports.b_link_add = function(req, res) {

    var name = req.body.name;
    var url = req.body.url;

    linkDao.add({ name: name, url: url }, function(err) {
        res.redirect('/admin/link/list');
    });
}

exports.b_link_edit_do = function(req, res) {

    var id = req.params.id;
    var name = req.body.name;
    var url = req.body.url;

    linkDao.updateById(id, { name: name, url: url }, function(err) {
        res.redirect('/admin/link/list');
    });
}

exports.b_link_del = function(req, res) {

    var id = req.body.id;

    linkDao.deleteById(id, function(err) {
        return res.json({ success: true, message: '链接已经被成功删除' });
    });
}
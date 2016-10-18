var Index = require('../dao/index');
var linkDao = Index.link;

exports.b_get_link_list = function(req, res) {

    var limit = 50;
    var page = 1;

    linkDao.getList({ page: page, limit: limit }, function(err, links) {
        res.render('admin/layout', {
            links: links,
            $body: 'link/list.html'
        });
    });
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
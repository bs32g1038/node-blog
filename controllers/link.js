var Index = require('../dao/index');
var linkDao = Index.link;

exports.b_get_link_list = function (req, res) {

    linkDao.getByQuery({}, null, {}, function (err, links) {

        res.render('admin/link-list', {
            flag: "lzc200",
            links: links
        });

    });

}

exports.b_link_add = function (req, res) {

    var name = req.body.name;
    var url = req.body.url;

    linkDao.add({
        name: name,
        url: url
    }, function (err) {
        return res.redirect('/admin/link/list');
    });

}

exports.b_link_del = function (req, res) {

    var id = req.body.id;

    linkDao.deleteById(id, function (err) {

        return res.json({
            success: true,
            msg: '链接已经被成功删除'
        });

    });
}

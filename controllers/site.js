var validator = require('validator');
var config = require('../config');
var Index = require('../dao/index');

var siteDao = Index.site;

exports.b_edit = function (req, res) {
    siteDao.getOneByQuery(config.site.key, '', function (err, site) {
        res.render('admin/site-edit', {
            site: site,
            flag: ''
        });
    })
}

exports.b_edit_do = function (req, res) {

    try {

        var id = req.params.id;
        var name = validator.trim(req.body.name);
        var logo = validator.trim(req.body.logo);
        var icp = validator.trim(req.body.icp);
        var url = validator.trim(req.body.url);
        var qr_code = validator.trim(req.body.qr_code);
        var code_header = validator.trim(req.body.code_header);

    } catch (err) {
        console.log(err.name + ": " + err.message);
    }

    if (!validator.isMongoId(id)) {
        res.status(400);
        return res.render('admin/site-edit', {
            site: {
                name,
                logo,
                icp,
                url,
                qr_code,
                code_header
            }
        });
    }

    siteDao.updateById(id, {
        name: name,
        logo: logo,
        icp: icp,
        url: url,
        qr_code: qr_code,
        code_header: code_header
    }, function (err) {
        res.redirect('/admin/site/edit');
    });
}
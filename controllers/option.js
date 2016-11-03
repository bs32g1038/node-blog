var validator = require('validator');
var config = require('../config');
var Index = require('../dao/index');

var optionDao = Index.option;

exports.b_site_edit = function(req, res) {
    optionDao.getByKey(config.site.key, function(err, site) {
        res.render('admin/layout', {
            site: site,
            $body: 'site/edit.html'
        });
    })
}

exports.b_site_edit_do = function(req, res) {

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
        return res.render('admin/layout', {
            site: { name, logo, icp, url, qr_code, code_header },
            $body: 'site/edit.html'
        });
    }

    optionDao.updateById(id, {
        name,
        logo,
        icp,
        url,
        qr_code,
        code_header,
    }, function(err) {
        res.redirect('/admin/site/edit');
    });
}
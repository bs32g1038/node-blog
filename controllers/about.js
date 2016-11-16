var validator = require('validator');
var config = require('../config');
var Index = require('../dao/index');
var aboutDao = Index.about;

exports.b_about_edit = function(req, res) {
    aboutDao.getById(config.administrator.account, function(err, about) {
        if (err) {
            return next(err);
        }
        res.render('admin/layout', {
            about: about,
            $body: 'about/edit.html'
        });
    })
}

exports.b_about_edit_do = function(req, res, next) {

    var id = req.params.id;
    var title = validator.trim(req.body.title);
    var content = validator.trim(req.body.content);

    aboutDao.updateById(id, {
        title,
        content
    }, function(err) {
        if (err) {
            return next(err);
        }
        res.redirect('/admin/about/edit');
    });
}
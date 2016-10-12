var validator = require('validator');
var config = require('../config');
var Index = require('../dao/index');
var aboutDao = Index.about;

exports.b_edit = function (req, res) {
    aboutDao.getOneByQuery(config.about.key, '', function (err, about) {
        res.render('admin/about-edit', {
            about: about,
            flag: ''
        });
    })
}

exports.b_edit_do = function (req, res) {

    try {
        var id = req.params.id;
        var title = validator.trim(req.body.title);
        var content = validator.trim(req.body.content);
    } catch (err) {
        console.log(err.name + ": " + err.message);
    }

    if (!validator.isMongoId(id)) {
        res.status(400);
        return res.render('admin/about-edit', {
            about: {
                title,
                content
            },
            flag: ''
        });
    }

    aboutDao.updateById(id, {
        title,
        content
    }, function (err) {
        res.redirect('/admin/about/edit');
    });
}
var validator = require('validator');
var config = require('../config');
var Index = require('../dao/index');
var userDao = Index.user;

exports.b_user_edit_do = function(req, res, next) {

    var id = req.params.id;

    var nick_name = validator.trim(req.body.nick_name);
    var motto = validator.trim(req.body.motto);
    var qq = validator.trim(req.body.qq);
    var email = validator.trim(req.body.email);
    var location = validator.trim(req.body.location);
    var img_url = validator.trim(req.body.img_url);
    var github = validator.trim(req.body.github);

    userDao.updateById(id, { nick_name, motto, qq, email, location, img_url, github }, function(err) {
        if (err) {
            return next(err);
        }
        return res.redirect('/admin/user/edit');
    });
}

exports.b_login = function(req, res) {
    res.render('admin/user/login', {});
}

exports.b_login_do = function(req, res) {

    var account = req.body.account;
    var password = req.body.password;

    if (validator.equals(account, config.administrator.account) &&
        validator.equals(password, config.administrator.password)
    ) {
        req.session.user = { account: account }; //记住到session

        return res.redirect('/admin/doc/list');

    } else {
        return res.redirect('/admin/login');
    }
}

exports.b_login_out = function(req, res) {
    req.session.user = null;
    res.redirect('/admin/login');
}

exports.b_user_edit = function(req, res, next) {
    userDao.getByAcount(config.administrator.account, function(err, user) {
        if (err) {
            return next(err);
        }
        return res.render('admin/layout', {
            user: user,
            $body: 'user/edit.html'
        });
    })
}
var validator = require('validator');
var config = require('../config');
var Index = require('../dao/index');
var userDao = Index.user;

exports.b_user_edit_do = function(req, res) {

    // var ditError;

    var id = req.params.id;

    var nick_name = validator.trim(req.body.nick_name);
    var motto = validator.trim(req.body.motto);
    var qq = validator.trim(req.body.qq);
    var email = validator.trim(req.body.email);
    var location = validator.trim(req.body.location);
    var img_url = validator.trim(req.body.img_url);
    var github = validator.trim(req.body.github);

    if (!validator.isMongoId(id)) {
        res.status(400);
        return res.render('admin/user-edit', {
            user: { nick_name, motto, qq, email, location, img_url, github }
        });
    }

    userDao.updateById(id, { nick_name, motto, qq, email, location, img_url, github }, function(err) {
        res.redirect('/admin/user/edit');
    });
}

exports.b_login = function(req, res) {
    res.render('admin/user/login', {});
}

exports.b_login_do = function(req, res) {

    var user = {
        account: req.body.account,
        password: req.body.password
    }

    if (validator.equals(user.account, config.administrator.account) &&
        validator.equals(user.password, config.administrator.password)
    ) {
        req.session.user = user; //记住到session
        
        res.redirect('/admin/doc/list');
        
    } else {
        res.redirect('/admin/user/login');
    }
}

exports.b_login_out = function(req, res) {
    req.session.user = null;
    res.redirect('/admin/user/login');
}

exports.b_user_edit = function(req, res) {
    userDao.getByAcount(config.administrator.account, function(err, user) {
        res.render('admin/layout', {
            user: user,
            $body: 'user/edit.html'
        });
    })
}
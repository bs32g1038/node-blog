var co = require('co');
var _ = require('lodash');
var tools = require('../common/tools');
var util = require('util');
var validator = require('validator');
var config = require('../common/config');

var Index = require('../dao/index');
var userDao = Index.user;

exports.b_user_edit = function (req, res) {

    var fields = '-_id -__v';

    userDao.getOneByAcount(config.administrator.account, fields, function (err, user) {

        res.render('admin/user-edit', {
            user: user,
            flag: ''
        });
    })

}

exports.b_user_edit_do = function (req, res) {

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
            user: { nick_name, motto, qq, email, img_url, github },
            flag: ''
        });
    }
    // {
    //     nick_name: nick_name,
    //     location: location,
    //     qq: qq,
    //     email: email,
    //     img_url: img_url,
    //     motto: motto
    // }
    userDao.updateById(id, { nick_name, motto, qq, email, img_url, github }, function (err) {
        res.redirect('/admin/user/edit');
    });

}

var co = require('co');
var _ = require('lodash');
var tools = require('../common/tools');
var util = require('util');
var validator = require('validator');
var config = require('../common/config');

var Index = require('../dao/index');
var userDao = Index.user;

exports.b_user_edit = function (req, res) {

    var fields = 'nick_name location qq email img_url motto';

    userDao.getOneByAcount(config.administrator.account, fields, function (err, user) {

        res.render('admin/user-edit', {
            user: user,
            flag: ''
        });
    })

}

exports.b_user_edit_do = function (req, res) {

    var id = req.params.id;

    var nick_name = req.body.nick_name;

    var motto = req.body.motto;

    var qq = req.body.qq;

    var email = req.body.email;

    var location = req.body.location;

    var img_url = req.body.img_url;

    userDao.updateById(id, {
        nick_name: nick_name,
        location: location,
        qq: qq,
        email: email,
        img_url: img_url,
        motto: motto
    }, function (err) {

        res.redirect('/admin/user/edit');

    });

}

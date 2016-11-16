require('./mongoose'); //初始化连接数据库
var config = require('../config');

var userDao = require('../dao/index').user;
var optionDao = require('../dao/index').option;
var aboutDao = require('../dao/index').about;

var _ = require('lodash');

userDao.getByAcount(config.administrator.account, function(err, user) {
    if (!user) {
        return userDao.add(config.administrator, function(err) {
            if (err) {}
            console.log("init user info success!");
        })
    }
    console.log("----------user info already exists,it can be used normally!----------------");
});

aboutDao.getById(config.administrator.account, function(err, about) {
    if (!about) {
        return aboutDao.add({ _id: config.administrator.account }, function(err) {
            console.log("init about info success!")
        })
    }
    console.log("----------about info already exists,it can be used normally!--------------");
});

/**
 * 初始化配置数据
 */
module.exports = function(app) {
    optionDao.getOption(function(err, option) {
        if (!option) {
            optionDao.add({}, function(err) {
                optionDao.getOption(function(err, option) {
                    option = option.toObject();
                    _.extend(app.locals, { option: _.omit(option, ['_id', '__v']) });
                    console.log("init Option info success!");
                })
            })
            return;
        }
        _.extend(app.locals, { option: _.omit(option, ['_id', '__v']) });
        console.log("----------site Option already exists,it can be used normally!--------------");
    });
}
var config = require('../config');
var userDao = require('../dao/index').user;
var _ = require('lodash');

// 验证用户是否登录
exports.authUser = function(req, res, next) {
    if (req.session.user) {
        userDao.getByAcount(req.session.user.account, function(err, user) {
            res.locals.current_user = user;
            console.log(res.locals.current_user)
            next();
        })
    } else {
        next();
    }
};
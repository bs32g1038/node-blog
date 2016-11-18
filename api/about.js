var config = require('../config');
var Index = require('../dao/index');
var aboutDao = Index.about;

exports.index = function(req, res, next) {
    aboutDao.getById(config.administrator.account, function(err, about) {
        if (err) {
            return next(err);
        }
        res.json({ success: true, data: { about: about } });
    })
}
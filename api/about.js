"use strict";

var config = require('../common/config');
var Index = require('../dao/index');
var aboutDao = Index.about;

exports.index = function (req, res) {

    aboutDao.getOneByQuery(config.about.key, null, null, function (err, about) {

        if (err) {
            return res.json({ success: false, error_msg: '页面获取数据错误，请重试！' });
        }

        res.json({ success: true, data: { about: about } });

    })

}

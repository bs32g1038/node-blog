"use strict";

exports.home = function (req, res) {
    res.render('web/index', {
        title: '冷夜流星的个人网站'
    });
}

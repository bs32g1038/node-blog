/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-03-25 14:24:07
 * @Last Modified by:   bs32g1038@163.com
 * @Last Modified time: 2017-03-25 14:24:07
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../helpers/logger");
var ignore = /^\/(public)/;
function default_1(req, res, next) {
    if (ignore.test(req.url)) {
        next();
        return;
    }
    var t = new Date();
    logger_1.default.info('Started', req.method, req.url, req.ip);
    res.on('finish', function () {
        let endTime = new Date();
        var duration = endTime.getTime() - t.getTime();
        logger_1.default.info('Completed', res.statusCode, ('(' + duration + 'ms)'));
    });
    next();
}
exports.default = default_1;
;

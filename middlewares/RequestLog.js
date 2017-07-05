/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-03-25 14:24:07
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-05-18 17:24:39
 */
const logger = require("../helpers/logger");
const ignore = /^\/(public)/;
module.exports = function(req, res, next) {
    if (ignore.test(req.url)) {
        next();
        return;
    }
    let t = new Date();
    logger.info('Started', req.method, req.url, req.ip);
    res.on('finish', function() {
        let endTime = new Date();
        let duration = endTime.getTime() - t.getTime();
        logger.info('Completed', res.statusCode, ('(' + duration + 'ms)'));
    });
    next();
}
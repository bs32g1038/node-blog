/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-05-18 17:18:55 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-05-18 17:19:17
 */
const cache = require("../helpers/cache");
const _ = require('lodash');
const SEPARATOR = '☆@☆';

function RateLimit(options) {
    let defaultOptions = {
        expired: 60 * 60 * 24,
        limitCount: 150,
        errorMsg: 'There is an exception to your IP, please try again later.',
        status: 429,
        showJson: true,
        name: 'rate-limit',
        keyGenerator: function(req) {
            let ipAddress;
            let headers = req.headers;
            let forwardedIpsStr = headers['x-real-ip'] || headers['x-forwarded-for'];
            forwardedIpsStr ? ipAddress = forwardedIpsStr : ipAddress = null;
            if (!ipAddress) {
                ipAddress = req.connection.remoteAddress;
            }
            return ipAddress;
        }
    };
    options = _.extend(defaultOptions, options);
    const { keyGenerator, limitCount, expired, status, errorMsg, name, showJson } = options;
    return async function(req, res, next) {
        let key = name + SEPARATOR + keyGenerator(req, res) + SEPARATOR + limitCount;
        try {
            let count = await cache.get(key);
            count = count || 0;
            if (count < limitCount) {
                count += 1;
                cache.setx(key, count, expired);
                res.set('X-RateLimit-Limit', limitCount);
                res.set('X-RateLimit-Remaining', limitCount - count);
                next();
            } else {
                res.status(status);
                if (showJson) {
                    res.send({ message: errorMsg });
                } else {
                    res.render('notify/notify', { error: errorMsg });
                }
            }
        } catch (error) {
            return next(error);
        }
    };
}
module.exports = RateLimit;
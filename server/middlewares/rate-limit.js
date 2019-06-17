const LRU = require('lru-cache');
const cache = new LRU();
let SEPARATOR = '☆@☆';

function RateLimit(options = {}) {

    let defaultOptions = {
        expired: 60 * 60 * 24,
        limitCount: 150,
        errorMsg: 'There is an exception to your IP, please try again later.',
        status: 429,
        showJson: false,
        name: 'rate-limit',
        keyGenerator: function (req) {
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
    options = Object.assign(defaultOptions, options);
    const { keyGenerator, limitCount, expired, status, errorMsg, name, showJson } = options;
    return function (req, res, next) {
        try {
            
            let key = name + SEPARATOR + keyGenerator(req, res) + SEPARATOR + limitCount;
            let count = cache.get(key);
            count = count || 0;
            if (count < limitCount) {
                count += 1;
                cache.set(key, count, expired);
                res.set('X-RateLimit-Limit', limitCount);
                res.set('X-RateLimit-Remaining', limitCount - count);
                return next();
            } else {
                res.status(status);
                if (showJson) {
                    res.send({ success: false, error_msg: errorMsg });
                } else {
                    res.render('notify/notify', { error: errorMsg });
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
}
module.exports = RateLimit;
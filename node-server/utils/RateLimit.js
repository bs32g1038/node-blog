const LRU = require("lru-cache");
const cache = new LRU();
const SEPARATOR = '☆@☆';

/**
 * 实现ip频率访问控制
 * @param {any} options 
 */
function RateLimit(options) {
    let cf = {
        expired: 1000 * 60 * 60 * 24,
        limitCount: 150,
        errorMsg: 'There is an exception to your IP, please try again later.',
        status: 429,
        showJson: true,
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
        },
    };
    Object.assign(cf, options || {});
    const { keyGenerator, limitCount, expired, status, errorMsg, name } = cf;
    return async function (req, res, next) {
        let key = name + SEPARATOR + keyGenerator(req, res) + SEPARATOR + limitCount;
        try {
            let count = await cache.get(key);
            count = count || 0;
            if (count < limitCount) {
                count += 1;
                cache.set(key, count, expired);
                res.set('X-RateLimit-Limit', limitCount);
                res.set('X-RateLimit-Remaining', limitCount - count);
                next();
            } else {
                res.status(status).json({ msg: errorMsg });
            }
        } catch (error) {
            return next(error);
        }
    };
}
module.exports = RateLimit;
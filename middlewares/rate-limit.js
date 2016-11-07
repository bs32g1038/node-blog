var cache = require('../common/redis');
var _ = require('lodash');


/**
 * 限制访问速度，默认通过ip记录
 * @param {Object} options
 * @returns
 */
function RateLimit (options) {
  var expired = options.expired || 60 * 60;
  var limitCount = options.limitCount || 150;
  var errorMsg = options.errorMsg || 'There is an exception to your IP, please try again later.';
  var statusCode = options.statusCode || 429;

  //默认ip键值
  var keyGenerator = options.keyGenerator || function (req) {
    var ipAddress;
    var headers = req.headers;
    var forwardedIpsStr = headers['x-real-ip'] || headers['x-forwarded-for'];
    forwardedIpsStr ? ipAddress = forwardedIpsStr : ipAddress = null;
    if (!ipAddress) {
      ipAddress = req.connection.remoteAddress;
    }
    return ipAddress;
  }

  //处理频率过快的结果
  var handler = function (req, res /*, next*/ ) {
    var key = keyGenerator(req, res);
    cache.ttl(key, function (err, expired) {
      var h = parseInt(expired / 60 / 60);
      var m = parseInt(expired / 60 % 60);
      var s = parseInt(expired % 60);

      function zfill(num) {
        if (num < 10) {
          return '0' + num;
        }
        return num;
      }
      const pos = errorMsg.indexOf('{{ expired }}') + '{{ expired }}'.length;
      var error = errorMsg.slice(0, pos).replace('{{ expired }}', zfill(h) + ":" + zfill(m) + ":" + zfill(s)) + errorMsg.slice(pos);
      res.status(statusCode).render('notify/notify', {
        error: error
      });
    });
  }

  function rateLimit(req, res, next) {
    var key = keyGenerator(req, res);
    cache.get(key, function (err, count) {
      if (err) {
        return next(err);
      }
      count = count || 0;
      if (count < limitCount) {
        count += 1;
        cache.set(key, count, expired);
        res.set('X-RateLimit-Limit', limitCount);
        res.set('X-RateLimit-Remaining', limitCount - count);
        next();
      } else {
        return handler(req, res, next);
      }
    })
  }

  return rateLimit;

}

// exports.peripperday = new RateLimit({
//   errorMsg: 'There is an exception to your IP, please try again in 24 hours later.',
//   limitCount: 100,
//   expired: 24 * 60 * 60
// });

module.exports = RateLimit;
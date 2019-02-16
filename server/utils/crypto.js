/**
 * 加密工具类api
 */
const crypto = require('crypto');

exports.md5 = function md5(str) {
    const md5 = crypto.createHash("md5");
    md5.update(str, 'utf8');
    return md5.digest('hex');
};

/**
 * 进行 SHA1 加密
 * @param {String} value 原值
 * @return {String} SHA1 值
 */
exports.sha1 = function (value) {
    let sha1 = crypto.createHash('sha1');
    sha1.update(value);
    return sha1.digest('hex');
};
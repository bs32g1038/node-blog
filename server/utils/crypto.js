/**
 * 加密工具类api
 */
const crypto = require('crypto');

exports.md5 = function md5(str) {
    const md5 = crypto.createHash("md5");
    md5.update(str, 'utf8');
    return md5.digest('hex');
};
/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-05-18 17:22:01 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-07-01 10:20:15
 */
const crypto = require("crypto");

function hash(method, s, format) {
  let sum = crypto.createHash(method);
  let isBuffer = Buffer.isBuffer(s);
  if (!isBuffer && typeof s === 'object') {
    s = JSON.stringify(s);
  }
  let input_encoding = isBuffer ? 'binary' : 'utf8';
  sum.update(s, input_encoding);
  return sum.digest(format || 'hex');
}
exports.md5 = function(str, format = 'hex') {
  return hash('md5', str, format);
};

function getIpAddress(req) {
  let ipAddress;
  let headers = req.headers;
  let forwardedIpsStr = headers['x-real-ip'] || headers['x-forwarded-for'];
  forwardedIpsStr ? ipAddress = forwardedIpsStr : ipAddress = null;
  if (!ipAddress) {
    ipAddress = req.connection.remoteAddress;
  }
  return ipAddress;
}

exports.getIpAddress = getIpAddress;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
function hash(method, s, format) {
    var sum = crypto.createHash(method);
    var isBuffer = Buffer.isBuffer(s);
    if (!isBuffer && typeof s === 'object') {
        s = JSON.stringify(s);
    }
    let input_encoding = isBuffer ? 'binary' : 'utf8';
    sum.update(s, input_encoding);
    return sum.digest(format || 'hex');
}
;
exports.md5 = function (str, format = 'hex') {
    return hash('md5', str, format);
};

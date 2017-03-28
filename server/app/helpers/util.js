"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
function hash(method, str, format) {
    var sum = crypto.createHash(method);
    sum.update(str, 'utf8');
    return sum.digest(format);
}
;
exports.md5 = function (str, format = 'hex') {
    return hash('md5', str, format);
};

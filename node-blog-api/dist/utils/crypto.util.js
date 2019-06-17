"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
exports.md5 = (str) => {
    const _md5 = crypto.createHash('md5');
    _md5.update(str, 'utf8');
    return _md5.digest('hex');
};
exports.sha1 = (value) => {
    const _sha1 = crypto.createHash('sha1');
    _sha1.update(value);
    return _sha1.digest('hex');
};
//# sourceMappingURL=crypto.util.js.map
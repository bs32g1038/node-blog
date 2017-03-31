import crypto = require('crypto');

function hash(method, s, format) {
    var sum = crypto.createHash(method);
    var isBuffer: boolean = Buffer.isBuffer(s);
    if (!isBuffer && typeof s === 'object') {
        s = JSON.stringify(s);
    }
    let input_encoding: any = isBuffer ? 'binary' : 'utf8';
    sum.update(s, input_encoding);
    return sum.digest(format || 'hex');
};

export const md5 = function (str, format = 'hex') {
    return hash('md5', str, format);
};
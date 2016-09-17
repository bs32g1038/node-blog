var moment = require('moment');
var config = require('./config');
exports.moment = moment;

moment.locale('zh-cn'); // 使用中文

// 格式化时间
exports.formatDate = function (date, friendly) {

    date = moment(date);

    if (friendly) {
        return date.fromNow();
    } else {
        return date.format('YYYY-MM-DD HH:mm:ss');
    }

};

//验证id
exports.validateId = function (str) {
    return (/^[a-zA-Z0-9\-_]+$/i).test(str);
};


/**
 * 根据对象的属性和值拼装key
 * @param [prefix] key前缀
 * @param obj 待解析对象
 * @returns {string} 拼装的key，带前缀的形如：prefix_name_Tom_age_20，不带前缀的形如：name_Tom_age_20
 */
exports.generateKey = function (prefix, obj) {
    if (typeof prefix === 'object') {
        obj = prefix;
        prefix = undefined;
    }
    var attr,
        value,
        key = '';
    for (attr in obj) {
        value = obj[attr];
        //形如： _name_Tom
        key += '_' + attr.toString().toLowerCase() + '_' + value.toString()
    }
    if (prefix) {
        //形如：prefix_name_Tom_age_20
        key = prefix + key;
    } else {
        //形如：name_Tom_age_20
        key = key.substr(1);
    }
    return key;
};

exports.getClientIP = function (req) {
    var ipAddress;
    var headers = req.headers;
    var forwardedIpsStr = headers['x-real-ip'] || headers['x-forwarded-for'];
    forwardedIpsStr ? ipAddress = forwardedIpsStr : ipAddress = null;
    if (!ipAddress) {
        ipAddress = req.connection.remoteAddress;
    }
    return ipAddress;
}

exports.getPageCount = function (count) {
    return Math.ceil(count / config.page_num);
}

exports.getPage = function (page) {
    return (parseInt(page, 10) || 1) > 0 ? page : 1;
}

//处理路径提交的页码
exports.doPage = function (page) {

    let num = parseInt(page, 10) || 1;

    return num > 0 ? num : 1;
}
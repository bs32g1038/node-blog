require('./mongoose'); //初始化连接数据库
var config = require('../config');
var optionDao = require('../dao/index').option;
var _ = require('lodash');
var redis = require('./redis');

/**
 * 初始化配置数据
 */
module.exports = function(app) {
    optionDao.getOption(function(err, option) {
        option = option.toObject();
        _.extend(app.locals, { option: _.omit(option, ['_id', '__v']) });
    })
}
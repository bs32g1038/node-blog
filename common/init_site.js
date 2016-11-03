require('./mongoose'); //初始化连接数据库
var config = require('../config');
var optionDao = require('../dao/index').option;
var _ = require('lodash');


/**
 * 初始化配置数据
 */
module.exports = function(app) {

    optionDao.getById(config.option.key, function(err, option) {
        _.extend(app.locals, _.pick(option, [
            'site_name', 'site_domain', 'site_description', 'site_keywords', 'site_header_code'
        ]));
    })

}
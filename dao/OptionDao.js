//基础类
var BaseDao = require('./BaseDao');
var config = require('../config');

class OptionDao extends BaseDao {

    getSiteData(callback) {
        this.model.findOne(config.option.key, 'site_name site_logo site_icp site_domain', callback);
    }
}

module.exports = OptionDao;
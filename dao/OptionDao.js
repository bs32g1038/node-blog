//基础类
var BaseDao = require('./BaseDao');
var config = require('../config');

class OptionDao extends BaseDao {

    constructor(model) {
        super(model);
        this._id = 'site_option';
    }

    getOption(callback) {
        this.model.findOne({ _id: this._id }, callback);
    }

    getSiteData(callback) {
        this.model.findOne({ _id: this._id }, 'site_name site_logo site_icp site_domain', callback);
    }
}

module.exports = OptionDao;
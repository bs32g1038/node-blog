//基础类
var BaseDao = require('./BaseDao');

class SiteDao extends BaseDao {

    getByKey(key, callback) {
        this.model.findOne({ key: key }, callback);
    }

}

module.exports = SiteDao;
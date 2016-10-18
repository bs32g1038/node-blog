//基础类
var BaseDao = require('./BaseDao');

class AboutDao extends BaseDao {

    getByKey(key, callback) {
        this.model.findOne({ key: key }, callback);
    }

}

module.exports = AboutDao;
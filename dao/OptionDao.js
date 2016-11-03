//基础类
var BaseDao = require('./BaseDao');

class OptionDao extends BaseDao {

    getByKey(key, callback) {
        this.model.findOne({_id: key}, callback);
    }

}

module.exports = OptionDao;
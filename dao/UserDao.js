//基础类
var BaseDao = require('./BaseDao');

class UserDao extends BaseDao {

    getByAcount(account, callback) {
        return this.model.findOne({ account: account }, '-__v -password -account', callback);
    }

}

module.exports = UserDao;
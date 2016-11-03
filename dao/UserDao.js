//基础类
var BaseDao = require('./BaseDao');

class UserDao extends BaseDao {

    getByAcount(account, callback) {
        return this.model.findOne({ account: account }, '-__v -password -account', callback);
    }

    getNickNameByAccount(account, callback) {
        return this.model.findOne({ account: account }, '-__v -_id nick_name', callback);
    }

}

module.exports = UserDao;
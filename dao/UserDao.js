//基础类
var BaseDao = require('./BaseDao');

class UserDao extends BaseDao {

    getOneByAcount(account, fileds, callback) {

        return this.model.findOne({account: account}, fileds, function (err, data) {

            if (err) {
                return callback(err, null);
            }

            callback(null, data);

        });
    }

}

module.exports = UserDao;
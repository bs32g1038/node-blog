/**************************************
 * 数据库操作类GuestbookDao继承BaseDao
 * 2016-7-25
 **************************************/

var config = require('../common/config');

//基础类
var BaseDao = require('./BaseDao');

class GuestbookDao extends BaseDao {

    updateReplyContentById(id, reply_content, callback) {

        this.model.update({ _id: id }, {
            $set: {
                reply_content: reply_content,
                pass: true
            }
        }, function (err, raw) {

            if (err) {
                return callback(err);
            }

            callback(null, raw);

        });

    }

    updatePass(_id, callback) {

        this.model.update({ _id: _id }, {
            $set: {
                pass: true
            }
        }, function (err, raw) {

            if (err) {
                return callback(err);
            }

            callback(null, raw);

        });
    }
}

module.exports = GuestbookDao;
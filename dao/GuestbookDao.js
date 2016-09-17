var config = require('../common/config');
var util = require('util');

//基础类
var BaseDao = require('./BaseDao');

function GuestbookDao(model) {
    BaseDao.call(this);
    this.model = model;
}

util.inherits(GuestbookDao, BaseDao);

GuestbookDao.prototype.updateReplyContentById = function (id, reply_content, callback) {

    this.model.update({_id: id}, {
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

GuestbookDao.prototype.updatePass = function (_id, callback) {

    this.model.update({_id: _id}, {
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

module.exports = GuestbookDao;
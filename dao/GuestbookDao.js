/**************************************
 * 数据库操作类GuestbookDao继承BaseDao
 * 2016-7-25
 **************************************/

//基础类
var BaseDao = require('./BaseDao');

class GuestbookDao extends BaseDao {

    getList(options, callback) {

        var page = options.page,
            limit = options.limit,
            order = options.order || 1;

        this.model.find({})
            .sort({ create_at: order })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec(callback);
    }

    getPassList(options, callback) {

        var page = options.page,
            limit = options.limit,
            order = options.order || 1;

        this.model.find({ pass: true })
            .sort({ create_at: order })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec(callback);
    }

    getPassCount(callback) {
        this.model.count({ pass: true }, callback);
    }

    updateReplyContentById(id, reply_content, callback) {
        this.model.update({ _id: id }, { $set: { reply_content: reply_content, pass: true } }, callback);
    }

    updatePass(id, callback) {
        this.model.update({ _id: id }, { $set: { pass: true } }, callback);
    }
}

module.exports = GuestbookDao;
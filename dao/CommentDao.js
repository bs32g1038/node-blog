/**************************************
 * 数据库操作类CommentDao继承BaseDao
 * 2016-7-25
 **************************************/

//基础类
var BaseDao = require('./BaseDao');

class CommentDao extends BaseDao {

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

    getNickNameById(id, callback) {
        this.model.findOne({ _id: id }, '-_id nick_name', function(err, comment) {
            if (!comment) {
                return callback(err, '');
            }
            callback(err, comment.nick_name);
        });
    }

    getListLikePostId(post_id, isPass, callback) {
        this.model.find({ post_id: post_id, pass: isPass },callback);
    }

    updatePassById(id, callback) {
        this.model.update({ _id: id }, { $set: { pass: true } },callback);
    }
}

module.exports = CommentDao;
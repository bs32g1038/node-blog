/**************************************
 * 数据库操作类CommentDao继承BaseDao
 * 2016-7-25
 **************************************/

//基础类
var BaseDao = require('./BaseDao');

class CommentDao extends BaseDao {

    /**
     * 获取评论列表，附带分页，排序，限制条目数
     * 
     * @param {any} options
     * @param {any} callback
     * 
     * @memberOf CommentDao
    
     */
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

    /**
     * 获取评论者的昵称
     * 
     * @param {any} id
     * @param {any} callback
     * 
     * @memberOf CommentDao
     */
    getNickNameById(id, callback) {
        this.model.findOne({ _id: id }, '-_id nick_name', function(err, comment) {
            if (!comment) {
                return callback(err, '');
            }
            callback(err, comment.nick_name);
        });
    }

    /**
     * 获取某个文章id下的所有已审核通过的评论
     * 
     * @param {any} post_id
     * @param {any} isPass
     * @param {any} callback
     * 
     * @memberOf CommentDao
    
     */
    getPassListLikePostId(post_id, callback) {
        this.model.find({ post_id: post_id, pass: true }, callback);
    }

    /**
     * 设置评论通过审核
     * 
     * @param {String} id            评论id
     * @param {function} callback    回调函数
     * 
     * @memberOf CommentDao
     */
    updatePassById(id, callback) {
        this.model.update({ _id: id }, { $set: { pass: true } }, callback);
    }
}

module.exports = CommentDao;
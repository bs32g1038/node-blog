/**************************************
 * 数据库操作类DocDao继承BaseDao
 * 2016-7-25
 **************************************/

var config = require('../config');

//基础类
var BaseDao = require('./BaseDao');

class DocDao extends BaseDao {

    getList(options, callback) {

        var page = options.page,
            limit = options.limit,
            order = options.order || -1;

        this.model.find({ is_deleted: false })
            .sort({ create_at: order })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec(callback);
    }

    getTitleById(id, callback) {
        this.model.findOne({ _id: id }, '-_id title', function(err, post) {
            if (!post) {
                return callback(err, '');
            }
            callback(err, post.title);
        });
    }

    getListByCategory(category, options, callback) {

        var page = options.page,
            limit = options.limit,
            order = options.order || -1;

        this.model.find({ category: category })
            .sort({ create_at: order })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec(callback);
    }

    getByIdAndUpdateVisitCount(id, callback) {
        this.model.findByIdAndUpdate({ _id: id }, { $inc: { visit_count: 1 } }, callback);
    }

    incCommentCount(id, callback) {
        this.model.update({ _id: id }, { $inc: { comment_count: 1 } }, callback);
    }

    decCommentCount(id, callback) {
        this.model.update({ _id: id }, { $inc: { comment_count: -1 } }, callback);
    }

    getSearchResult(key, options, callback) {

        var page = options.page || 1,
            page_size = options.page_size || 10,
            order = options.order || -1;

        this.model.find({ title: { $regex: key } })
            .sort({ create_at: order })
            .skip((page - 1) * page_size)
            .limit(page_size)
            .exec(callback);
    }

    getCountByLikeKey(key, callback) {

        this.model.count({ title: { $regex: key } }, function(err, sumCount) {
            if (err) {
                return callback(err);
            }
            return callback(null, {
                sum_count: sumCount,
                page_count: Math.ceil(sumCount / config.page_num)
            });
        });
    }

    getArchives(options, callback) {

        var page = options.page,
            limit = options.limit,
            order = options.order || -1;

        this.model.find({}, 'title create_at')
            .sort({ create_at: order })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec(callback);
    }

}
module.exports = DocDao;
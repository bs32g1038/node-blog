/**************************************
 * 数据库操作类DocDao继承BaseDao
 * 2016-7-25
 **************************************/

var config = require('../common/config');

//基础类
var BaseDao = require('./BaseDao');

class DocDao extends BaseDao {

    getByIdAndUpdateVisitCount(id, callback) {

        this.model.findByIdAndUpdate({ _id: id }, { $inc: { visit_count: 1 } }, function (err, doc) {

            if (err) {
                return callback(err);
            }

            callback(null, doc);

        });

    };

    getPostsByCategoryId(category_id, pageIndex, pageSize, callback) {

        this.model.find({ category_id: category_id })
            .skip((page - 1) * config.page_num)
            .limit(config.page_num)
            .exec(function (err, docs) {
                if (err) {
                    callback(err);
                }
                return callback(null, docs);

            });
    };

    getArchivesByPage(page, callback) {

        this.model.find({}, 'title create_at').sort({ "create_at": -1 })
            .skip((page - 1) * config.page_num)
            .limit(config.page_num)
            .exec(function (err, docs) {
                if (err) {
                    callback(err);
                }
                return callback(null, docs);

            });
    };

    incCommentCount(id, callback) {

        this.model.update({ _id: id }, { $inc: { comment_count: 1 } }, function (err, raw) {

            if (err) {
                return callback(err);
            }

            return callback(null, raw);

        });
    };

    decCommentCount(id, callback) {

        this.model.update({ _id: id }, { $inc: { comment_count: -1 } }, function (err, raw) {

            if (err) {
                return callback(err);
            }

            return callback(null, raw);

        });
    };


    getSearchResult(title, page, callback) {

        this.model.find({ title: new RegExp(title) }).sort({ "create_at": -1 })
            .skip((page - 1) * config.page_num)
            .limit(config.page_num)
            .exec(function (err, docs) {
                if (err) {
                    callback(err);
                }
                return callback(null, docs);

            });
    };

    getCountByLikeTitle(title, callback) {

        this.model.count({ title: new RegExp(title) }, function (err, sumCount) {

            if (err) {
                return callback(err);
            }
            return callback(null, {
                sum_count: sumCount,
                page_count: Math.ceil(sumCount / config.page_num)
            });

        });
    }


}
module.exports = DocDao;

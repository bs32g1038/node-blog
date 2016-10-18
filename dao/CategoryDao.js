/**************************************
 * 数据库操作类CategoryDao继承BaseDao
 * 2016-7-25
 **************************************/

//基础类
var BaseDao = require('./BaseDao');


/**
 * 文章分类数据库操作类
 * 
 * @class CategoryDao
 * @extends {BaseDao}               基础类
 */
class CategoryDao extends BaseDao {

    getList(options, callback) {

        var page = options.page,
            limit = options.limit,
            order = options.order || -1;

        this.model.find({})
            .sort({ order: order })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec(callback);
    }

    /**
     * 文章数量自增
     * 
     * @param {String} alias        分类别称，非显示名字
     * @param {function} callback   回调函数
     * 
     * @memberOf CategoryDao
     */
    incPostCountByAlias(alias, callback = function() {}) {
        this.model.update({ alias: alias }, { $inc: { post_count: 1 } }, callback);
    }

    /**
     * 文章数量自减
     * 
     * @param {String} alias        分类别称，非显示名字
     * @param {function} callback   回调函数
     * 
     * @memberOf CategoryDao
     */
    decPostCountByAlias(alias, callback) {
        this.model.update({ alias: alias }, { $inc: { post_count: -1 } }, callback);
    }

    /**
     * 获取当前分类的文章数量
     * 
     * @param {String} id           分类id
     * @param {function} callback   回调函数
     * 
     * @memberOf CategoryDao
     */
    getPostCountById(id, callback) {
        this.model.findOne({ _id: id }, 'post_count', callback);
    }

    /**
     * 获取当前分类文章数量
     * 
     * @param {String} alias        分类别称，非显示名字
     * @param {function} callback   回调函数
     * 
     * @memberOf CategoryDao
     */
    getPostCountByAlias(alias, callback) {
        this.model.findOne({ alias: alias }, '-_id post_count', function(err, post_count) {
            if (err) {
                return callback(err);
            }
            callback(null, parseInt(post_count, 10) || 0);
        });
    }


    /**
     * 提升分类权重，用于控制分类排序位置
     * 
     * @param {String} id           分类id
     * @param {function} callback   回调函数
     * 
     * @memberOf CategoryDao
     */
    incOrderById(id, callback) {
        this.model.update({ _id: id }, { $inc: { order: 1 } }, callback);
    }

    /**
     * 降低分类权重，用于控制分类排序位置
     * 
     * @param {String} id
     * @param {function} callback
     * 
     * @memberOf CategoryDao
     */
    decOrderById(id, callback) {
        this.model.update({ _id: id, order: { $gt: 0 } }, { $inc: { order: -1 } }, callback);
    }

    /**
     * 获取分类显示名字通过分类的别称
     * 
     * @param {any} alias
     * @param {any} callback
     * 
     * @memberOf CategoryDao
     */
    getNameByAlias(alias, callback) {
        this.model.findOne({ alias: alias }, '-_id name', callback);
    }

}

module.exports = CategoryDao;
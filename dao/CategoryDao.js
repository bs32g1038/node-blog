/**************************************
 * 数据库操作类CategoryDao继承BaseDao
 * 2016-7-25
 **************************************/

var config = require('../common/config');
var util = require('util');

//基础类
var BaseDao = require('./BaseDao');


class CategoryDao extends BaseDao {

    updatePostCountById(id, inc_num, callback) {

        this.model.update({_id: id}, {$inc: {post_count: inc_num}}, function (err) {

            if (err) {
                return callback(err);
            }

            callback(null);

        });

    }

    incPostCountByAlias(alias, callback) {

        this.model.update({alias: alias}, {$inc: {post_count: 1}}, function (err) {

            if (err) {
                return callback(err);
            }

            callback(null);

        });

    }

    decPostCountByAlias(alias, callback) {

        this.model.update({alias: alias}, {$inc: {post_count: -1}}, function (err) {

            if (err) {
                return callback(err);
            }

            callback(null);

        });

    }

    getPostCountById(id, callback) {

        this.model.findOne({_id: id}, 'post_count', function (err, res) {

            if (err) {
                return callback(err);
            }
            callback(null, res);
        });

    }


    getPostCountByAlias(alias, callback) {

        this.model.findOne({alias: alias}, '-_id post_count', function (err, post_count) {

            if (err) {
                return callback(err);
            }

            callback(null, parseInt(post_count, 10) || 0);
        });

    }


    incOrderById(id, callback) {

        this.model.update({_id: id}, {$inc: {order: 1}}, function (err) {

            if (err) {
                return callback(err);
            }

            callback(null);

        });

    }

    decOrderById(id, callback) {

        this.model.update({_id: id, order: {$gt: 0}}, {$inc: {order: -1}}, function (err) {

            if (err) {
                return callback(err);
            }

            callback(null);

        });

    }

    getNameByAlias(alias, callback) {

        this.model.findOne({alias: alias}, '-_id name', function (err, res) {

            if (err) {
                return callback(err);
            }
            callback(null, res);
        });
    }

}

module.exports = CategoryDao;


/**************************************
 * 数据库操作类CommentDao继承BaseDao
 * 2016-7-25
 **************************************/

var config = require('../common/config');
var util = require('util');

//基础类
var BaseDao = require('./BaseDao');

function CommentDao(model) {

    BaseDao.call(this);

    this.model = model;
}

util.inherits(CommentDao, BaseDao);

CommentDao.prototype.getListLikePostId = function (post_id, isPass, callback) {

    this.model.find({post_id: post_id, pass: isPass}, function (err, docs) {

        if (err) {
            return callback(err);
        }
        return callback(null, docs);


    });
};

CommentDao.prototype.updatePassById = function (id, callback) {

    this.model.update({_id: id}, {$set: {pass: true}}, function (err, raw) {

        if (err) {
            return callback(err);
        }

        return callback(null, raw);

    });

};

module.exports = CommentDao;
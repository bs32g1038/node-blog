//基础类
var BaseDao = require('./BaseDao');

class TagDao extends BaseDao {

    incPostCountByName(name, callback) {

        callback = callback || function () {};

        this.model.update({name: name}, {$inc: {post_count: 1}}, function (err) {

            if (err) {
                return callback(err);
            }

            callback(null);

        });

    }

    decPostCountByName(name, callback) {

        this.model.update({name: name}, {$inc: {post_count: -1}}, function (err) {

            if (err) {
                return callback(err);
            }

            callback(null);

        });

    }

    getOneByName(name, callback) {

        this.model.findOne({name: name}, function (err, model) {

            if (err) return callback(err, null);

            return callback(null, model);
        });

    }

}

module.exports = TagDao;
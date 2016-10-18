/**************************************
 * 数据库操作基础类BaseDao
 * 2016-7-25
 **************************************/

class BaseDao {

    constructor(model) {
        this.model = model;
    }

    add(data, callback = function() {}) {
        this.model.create(data, callback);
    }

    getById(id, callback) {
        this.model.findById(id, callback);
    }

    getAll(callback) {
        this.model.find({}, callback);
    }

    deleteById(id, callback = function() {}) {
        this.model.remove({ _id: id }, callback);
    }

    count(callback) {
        this.model.count({}, callback);
    }

    updateById(id, doc, callback = function() {}) {
        this.model.update({ _id: id }, doc, callback);
    }



}
module.exports = BaseDao;
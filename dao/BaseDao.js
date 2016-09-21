/**************************************
 * 数据库操作基础类BaseDao
 * 2016-7-25
 **************************************/

function BaseDao(model) {
    this.model = model;
}

BaseDao.prototype.add = function (data, callback) {

    this.model.create(data, function (err) {

        if (err) {
            return callback(err);
        }

        return callback(null);
    });
}


BaseDao.prototype.getById = function (id, callback) {

    return this.model.findById(id, function (err, data) {

        if (err) {
            return callback(err, null);
        }

        callback(null, data);

    });

};

BaseDao.prototype.getByIdAndUpdate = function (id, update, callback) {

    return this.model.findByIdAndUpdate(id, update, function (err, data) {

        if (err) {
            return callback(err, null);
        }

        callback(null, data);

    });
}

BaseDao.prototype.getAll = function (callback) {

    this.model.find({}, function (err, model) {

        if (err) return callback(err);

        return callback(null, model);

    });
};

BaseDao.prototype.getByQuery = function (query, fileds, opt, callback) {


    this.model.find(query, fileds, opt, function (err, model) {

        if (err) return callback(err, null);

        return callback(null, model);
    });
};

BaseDao.prototype.getOneByQuery = function (query, fileds, opt, callback) {


    this.model.findOne(query, fileds, opt, function (err, model) {

        if (err) return callback(err, null);

        return callback(null, model);
    });
};

BaseDao.prototype.deleteById = function (id, callback) {

    this.model.remove({ _id: id }, function (err, raw) {

        if (err) return callback(err);

        return callback(null, raw);

    });

};


BaseDao.prototype.getSumCount = function (callback) {

    this.model.count({}, function (err, sumCount) {

        if (err) {
            return callback(err);
        }

        return callback(null, sumCount);

    });
}

BaseDao.prototype.getSumCountByQuery = function (query, callback) {

    this.model.count(query, function (err, sumCount) {

        if (err) {
            return callback(err);
        }

        return callback(null, sumCount);

    });
}

BaseDao.prototype.updateById = function (id, doc, callback) {

    this.model.update({ _id: id }, doc, function (err, raw) {

        if (err) {
            return callback(err);
        }

        return callback(null, raw);

    });
}

BaseDao.prototype.findByIdAndUpdate = function (id, fields, callback) {

    this.model.findByIdAndUpdate({ _id: id }, fields, function (err, doc) {

        if (err) {
            return callback(err);
        }

        callback(null, doc);

    });
}

BaseDao.prototype.getListByPage = function (obj, callback) {

    var page = obj.page || 1;

    var page_size = obj.page_size || 10;

    var query = obj.query || {};

    var sort = obj.sort || { create_at: -1 };

    var fileds = obj.field || null;

    this.model.find(query)
        .select(fileds)
        .sort(sort)
        .skip((page - 1) * page_size)
        .limit(page_size)
        .exec(function (err, docs) {

            if (err) {
                return callback(err);
            }

            return callback(null, docs);

        });
};


module.exports = BaseDao;
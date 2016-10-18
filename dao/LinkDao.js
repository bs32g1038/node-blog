//基础类
var BaseDao = require('./BaseDao');

class LinkDao extends BaseDao {

    getList(options, callback) {

        var page = options.page,
            limit = options.limit,
            order = options.order || -1;

        this.model.find({})
            .sort({ create_at: order })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec(callback);
    }

}

module.exports = LinkDao;
//基础类
var BaseDao = require('./BaseDao');

class MediaDao extends BaseDao {

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

    updateAllQuoteToNull(quote, callback) {
        this.model.update({ quote: quote }, { $unset: { quote: null } }, { multi: true }, callback);
    }

    updateAllQuoteByFileName(file_name, post_id, callback = function() {}) {
        this.model.update({ file_name: file_name }, { quote: post_id }, { multi: true }, callback);
    }
}

module.exports = MediaDao;
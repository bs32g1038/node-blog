/**
 * 扩展express中的response对象
 */
exports.setHeadPaging = function (req, res, next) {
    res.setHeadPaging = function (data) {
        res.set('X-Paging', JSON.stringify({
            page: 1,
            limit: 10,
            total: 0,
            ...data
        }));
    };
    next();
};

exports.error = function (req, res, next) {
    res.error = function (statusCode, errObj) {
        res.status(statusCode).json({
            error: {
                ...errObj
            }
        });
    };
};
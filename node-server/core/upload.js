/**
 * 上传api类
 */
// const uploadLocal = require('../middlewares/StoreFile');

class UploadApi {

    // 上传单个文件
    static async uploadSingalImage(req, res, next) {
        // return uploadLocal(req, res, next);
        next();
    }

}

module.exports = UploadApi;
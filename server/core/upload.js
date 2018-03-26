const mongoose = require("mongoose");
const ReqRouter = require('./decorator-router');
const models = require('../models');
const config = require('../config');
const uploadLocal = require('../middlewares/StoreFile');

@ReqRouter.ROUTER('/api/upload')
class UploadApi {

    @ReqRouter.POST('/image')
    // @ReqRouter.AUTH()
    static async one(req, res, next) {
        return uploadLocal(req, res, next)
    }

}
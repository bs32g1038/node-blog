const multer = require('multer');
const path = require('path');
const fs = require('fs');
const moment = require('moment');
const config = require('../config');
const utils = require('utility');
let storage;
storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const basePath = 'static/upload/' + moment().format("YYYY");
        if (!fs.existsSync(basePath)) {
            fs.mkdirSync(basePath);
        }
        cb(null, basePath);
    },
    filename: function(req, file, cb) {
        cb(null, utils.md5(utils.YYYYMMDDHHmmss() + file.originalname) + path.extname(file.originalname));
    }
});
let upload = multer({
    storage: storage
});
let uploadSingle = upload.single('file');
let uploadLocal = function(req, res, next) {
    uploadSingle(req, res, function(err) {
        if (err) {
            return next(err);
        }
        try {
            let url = '/static/upload/' + moment().format("YYYY") + '/' + req.file.filename;
            return res.json({ url: url });
        } catch (error) {
            return next(error);
        }
    });
};
module.exports = uploadLocal;
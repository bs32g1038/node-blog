/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-05-18 17:20:33 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-07-01 22:40:53
 */
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const moment = require('moment');
const config = require('../config');
let storage; //记录存储方式
storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const basePath = 'static/images/' + moment().format("YYYY");
        if (!fs.existsSync(basePath)) {
            fs.mkdirSync(basePath);
        }
        cb(null, basePath);
    },
    filename: function(req, file, cb) {
        cb(null, moment().format("YYYY") + path.extname(file.originalname));
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
            let url = '/static/images/' + moment().format("YYYY") + '/' + req.file.filename;
            return res.json({ url: url });
        } catch (error) {
            return next(error);
        }
    });
};
module.exports = uploadLocal;
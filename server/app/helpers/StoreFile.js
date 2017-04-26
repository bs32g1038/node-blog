"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer = require('multer');
var path = require('path');
var utility = require('utility');
var fs = require('fs');
var moment = require('moment');
var storage; //记录存储方式
storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var basePath = 'public/media/' + moment().format("YYYY");
        if (!fs.existsSync(basePath)) {
            fs.mkdirSync(basePath);
        }
        cb(null, basePath);
    },
    filename: function (req, file, cb) {
        var key = utility.md5(file.originalname + String((new Date()).getTime())) + path.extname(file.originalname);
        cb(null, key);
    }
});
var upload = multer({
    storage: storage
});
var uploadSingle = upload.single('file');
var uploadLocal = function (req, res, next) {
    uploadSingle(req, res, function (err) {
        return __awaiter(this, void 0, void 0, function* () {
            if (err) {
                return next(err);
            }
            var type = req.file.mimetype;
            var filename = req.file.filename;
            var size = req.file.size;
            try {
                // var site_domain = req.app.locals.option.site_domain;
                var site_domain = 'http://127.0.0.1';
                var url = site_domain + '/media/' + moment().format("YYYY") + '/' + req.file.filename;
                console.log({ url: url });
                return res.json({ url: url });
            }
            catch (error) {
                return next(error);
            }
        });
    });
};
exports.default = uploadLocal;

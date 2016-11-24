var multer = require('multer');
var path = require('path');
var utility = require('utility');
var qn = require('qn');
var config = require('../config');
var fs = require('fs');
var moment = require('moment');
var mediaDao = require('../dao/index').media;


const isLocal = config.qn_on === false;

var storage; //记录存储方式
var qnClient;

if (isLocal) { //本地存储
    storage = multer.diskStorage({
        destination: function(req, file, cb) {
            var basePath = 'public/media/' + moment().format("YYYY");
            if (!fs.existsSync(basePath)) {
                fs.mkdirSync(basePath);
            }
            cb(null, basePath)
        },
        filename: function(req, file, cb) {
            var key = utility.md5(file.originalname + String((new Date()).getTime())) + path.extname(file.originalname);
            cb(null, key);
        }
    });
} else { //7牛云存储
    storage = multer.memoryStorage();
    qnClient = qn.create(config.qn_access); //7牛 client
}

var upload = multer({
    storage: storage
});

var uploadSingle = upload.single('file');


//上传到七牛
var uploadQn = function(req, res, callback) {
    uploadSingle(req, res, function(err) {
        if (err) {
            return callback(err)
        }
        var filename = req.file.originalname;
        var key = utility.md5(filename + String((new Date()).getTime())) + path.extname(filename);
        qnClient.upload(req.file.buffer, {
            key: key
        }, function(err, result) {
            callback(err, result.url);
        });
    })
}

var uploadLocal = function(req, res, next) {
    uploadSingle(req, res, function(err) {
        if (err) {
            next(err)
        }
        var type = req.file.mimetype;
        var filename = req.file.filename;
        var size = req.file.size;
        mediaDao.add({
            type: type,
            file_name: filename,
            size: size
        }, function(err) {
            if (err) {
                next(err)
            }
            var site_domain = req.app.locals.option.site_domain;
            var url = site_domain + '/media/' + moment().format("YYYY") + '/' + req.file.filename;
            return res.json({ url: url, success: true });
        });
    });
}

module.exports = isLocal ? uploadLocal : uploadQn;
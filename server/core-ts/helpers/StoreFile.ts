var multer = require('multer');
var path = require('path');
var utility = require('utility');
var fs = require('fs');
var moment = require('moment');
import MediaService from '../service/MediaService';
const mediaService = new MediaService();

var storage; //记录存储方式
storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var basePath = 'public/media/' + moment().format("YYYY");
        if (!fs.existsSync(basePath)) {
            fs.mkdirSync(basePath);
        }
        cb(null, basePath)
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
    uploadSingle(req, res, async function (err) {
        if (err) {
            return next(err)
        }
        var type = req.file.mimetype;
        var filename = req.file.filename;
        var size = req.file.size;
        try {
            await mediaService.create({
                type: type,
                file_name: filename,
                size: size
            });
            // var site_domain = req.app.locals.option.site_domain;
            var site_domain = 'http://127.0.0.1';
            var url = site_domain + '/public/media/' + moment().format("YYYY") + '/' + req.file.filename;
            console.log({ url: url })
            return res.json({ url: url });
        } catch (error) {
            return next(error)
        }
    });
}

export default uploadLocal
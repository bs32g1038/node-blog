var multer = require('multer');
var path = require('path');
var utility = require('utility');
var qn = require('qn');
var config = require('../config');

const isLocal = config.qn_access.accessKey == 'your access key';

var storage;          //记录存储方式
var qnClient;

if (isLocal) {        //本地存储
  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      var key = utility.md5(file.originalname + String((new Date()).getTime())) + path.extname(file.originalname);
      cb(null, key);
    }
  });
} else {              //7牛云存储
  storage = multer.memoryStorage();
  qnClient = qn.create(config.qn_access); //7牛 client
}

var upload = multer({
  storage: storage
});

var uploadSingle = upload.single('file');


//上传到七牛
var uploadQn = function (req, res, callback) {
  uploadSingle(req, res, function (err) {
    if (err) {
      return callback(err)
    }
    var filename = req.file.originalname;
    var key = utility.md5(filename + String((new Date()).getTime())) + path.extname(filename);
    qnClient.upload(req.file.buffer, {
      key: key
    }, function (err, result) {
      callback(err, result.url);
    });
  })
}

var uploadLocal = function (req, res, callback) {
  uploadSingle(req, res, function (err) {
    return callback(err, "/uploads/" + req.file.filename)
  });
}

module.exports = isLocal ? uploadLocal : uploadQn;
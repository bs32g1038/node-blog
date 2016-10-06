var qn = require('qn');
var config = require('./config');
var multer = require('multer');
var path = require('path');
var utility = require('utility');

//7牛 client
var qnClient = qn.create(config.qn_access);

var storage = multer.memoryStorage()
var upload = multer({
  storage: storage
})


function uploadQn(req, res, callback) {

  upload(req, res, function (err) {

    if (err) {
      return callback(err)
    }
    
    var filename = req.file.filename;
    var key = utility.md5(filename + String((new Date()).getTime())) + path.extname(filename);
    qnClient.upload(req.file.buffer, {
      key: key
    }, function (err, result) {
      callback(err, result);
    });
  })
}

module.exports = uploadQn;
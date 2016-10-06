var multer = require('multer');
var path = require('path');
var utility = require('utility');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    var key = utility.md5(file.originalname + String((new Date()).getTime())) + path.extname(file.originalname);
    cb(null, key);
  }
})

var upload = multer({
  storage: storage
})

var uploadSingle = upload.single('file');

exports.uploadSingle = uploadSingle;
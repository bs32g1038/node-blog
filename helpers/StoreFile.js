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
const shortid = require('shortid');
let storage; //记录存储方式
storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const basePath = 'public/media/' + moment().format("YYYY");
    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath);
    }
    cb(null, basePath);
  },
  filename: function(req, file, cb) {
    cb(null, shortid.generate() + path.extname(file.originalname));
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
      // var site_domain = req.app.locals.option.site_domain;
      let site_domain = config.setting.domain;
      let url =  '/media/' + moment().format("YYYY") + '/' + req.file.filename;
      console.log({ url: url });
      return res.json({ url: url });
    } catch (error) {
      return next(error);
    }
  });
};
module.exports = uploadLocal;
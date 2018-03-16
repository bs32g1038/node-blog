const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const multer = require('multer');
const utils = require('utility');
const config = require('../config');
const logger = require('../utils/logger');
const util = require('util');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
let uploadSingle = upload.single('file');
let uploadLocal = function(req, res, next) {
    uploadSingle(req, res, function(err) {
        if (err) {
            return next(err);
        }
        const width = req.query.w;
        const height = req.query.h;
        const isEditor = req.query.isEditor;
        const date = new Date(); //获取到当前的系统时间
        const fileName = utils.md5(utils.YYYYMMDD() + String(req.file.size) + req.file.originalname) + path.extname(req.file.originalname);
        const sharpImg = sharp(req.file.buffer);
        if (width && height) {
            sharpImg.resize(Number(width), Number(height));
            sharpImg.max();
        } else {
            sharpImg.resize(1024, 1024)
            sharpImg.min()
        }
        sharpImg.withoutEnlargement();
        const basePath = path.resolve(__dirname, `../../static/upload/${date.getFullYear()}/`);
        if (!fs.existsSync(basePath)) {
            fs.mkdirSync(basePath);
        }
        sharpImg.toFile(path.resolve(__dirname, basePath + '/' + fileName)).then((info) => {
            const url = '/static/upload/' + date.getFullYear() + '/' + fileName;
            if (isEditor) {
                return res.json({ errno: 0, data: [url] });
            }
            return res.json({ url });
        }).catch((err) => {
            logger.info(err)
            return res.json({ msg: '上传图片失败！' });
        });
    });
};
module.exports = uploadLocal;
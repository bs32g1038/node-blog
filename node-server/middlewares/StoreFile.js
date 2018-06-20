const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const multer = require('multer');
const { md5 } = require('../utils/crypto');
const logger = require('../utils/logger');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
let uploadSingle = upload.single('file');
let uploadLocal = function (req, res, next) {
    uploadSingle(req, res, function (err) {

        /**
         * 上传单个文件，可根据参数生成图片的大小
         * @param {number} w 宽度
         * @param {number} h 高度
         * @return {Object} 返回对象{url: ''}
         */
        if (err) {
            return next(err);
        }
        const width = req.query.w;
        const height = req.query.h;
        const date = new Date();  // 时间对象
        const fileName = md5(date.getTime() + String(req.file.size) + req.file.originalname) + path.extname(req.file.originalname);
        const sharpImg = sharp(req.file.buffer);
        if (width && height) {
            sharpImg.resize(Number(width), Number(height));
            sharpImg.max();
        } else {
            sharpImg.resize(1024, 1024);
            sharpImg.min();
        }
        sharpImg.withoutEnlargement();
        const basePath = path.resolve(__dirname, `../upload/${date.getFullYear()}/`);
        if (!fs.existsSync(basePath)) {
            fs.mkdirSync(basePath);
        }
        sharpImg.toFile(path.resolve(__dirname, basePath + '/' + fileName)).then((info) => {
            const url = '/static/upload/' + date.getFullYear() + '/' + fileName;
            return res.json({ url });
        }).catch((err) => {
            logger.error(err);
            return res.status(500).json({ message: '上传图片失败！' });
        });
    });
};
module.exports = uploadLocal;
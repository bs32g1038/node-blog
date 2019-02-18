/**
 * 上传api类
 */
const StoreFile = require('../middlewares/StoreFile');
const fs = require('fs');
const path = require('path');
const models = require('../models');
const sharp = require('sharp');
const logger = require('../utils/logger');
const { md5 } = require('../utils/crypto');
class UploadApi {

    // 上传单个文件
    static async uploadSingalImage(req, res, next) {
        return StoreFile.uploadSingle(req, res, function (err) {

            /**
             * 上传单个文件，可根据参数生成图片的大小
             * @param {number} w 宽度
             * @param {number} h 高度
             * @return {Object} 返回对象{url: ''}
             */
            if (err) {
                return next(err);
            }

            // 实体数据
            const originalName = req.file.originalname;
            const mimetype = req.file.mimetype;
            const size = req.file.size;
            const suffix = path.extname(req.file.originalname);
            const name = md5(req.file.buffer);
            const fileName = name + suffix;
            const filePath = '/static/upload/' + new Date().getFullYear() + '/';

            // 图片处理
            const width = req.query.w;
            const height = req.query.h;
            const sharpImg = sharp(req.file.buffer);
            if (width && height) {
                sharpImg.resize(Number(width), Number(height));
                sharpImg.max();
            } else {
                sharpImg.resize(1024, 1024);
                sharpImg.min();
            }
            sharpImg.withoutEnlargement();
            const basePath = path.resolve(__dirname, `../..` + filePath);
            if (!fs.existsSync(basePath)) {
                fs.mkdirSync(basePath);
            }
            return sharpImg.toFile(basePath + '/' + fileName).then(async (info) => {
                const file = await models.Media.create({
                    originalName,
                    name,
                    mimetype,
                    size,
                    suffix,
                    fileName,
                    filePath,
                    type: 'image'
                });
                const url = filePath + '/' + fileName;
                return res.json({
                    _id: file._id,
                    url
                });
            }).catch((err) => {
                if(err.code === 11000){
                    res.json();
                }
                logger.error(err);
                return res.status(500).json({ message: '上传图片失败！' });
            });
        });
    }

    static async uploadStaticFile(req, res, next) {
        return StoreFile.uploadSingle(req, res, async function (err) {
            const originalName = req.file.originalname;
            const mimetype = req.file.mimetype;
            const size = req.file.size;
            const suffix = path.extname(req.file.originalname);
            const name = md5(req.file.buffer);
            const fileName = name + suffix;
            const filePath = '/static/upload/' + new Date().getFullYear() + '/';
            try {
                await fs.writeFileSync(path.resolve(__dirname, '../..' + filePath) + '/' + fileName, req.file.buffer);
                const file = await models.File.create({
                    originalName,
                    name,
                    mimetype,
                    size,
                    suffix,
                    fileName,
                    filePath
                });
                return res.status(201).json({
                    _id: file._id,
                    url: filePath + fileName
                });
            } catch (error) {
                console.log(error);
                res.json({
                    message: '写入文件错误'
                });
            }
        });
    }

}

module.exports = UploadApi;
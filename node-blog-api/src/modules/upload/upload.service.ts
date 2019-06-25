import { Model } from 'mongoose';
import * as multer from 'multer';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { File } from '../../models/file.model';
import { Media } from '../../models/media.model';
import { md5 } from '../../utils/crypto.util';
import * as path from 'path';
import * as fs from 'fs';

const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadSingle = upload.single('file');

@Injectable()
export class UploadService {
    constructor(
        @InjectModel('file') private readonly fileModel: Model<File>,
        @InjectModel('media') private readonly mediaModel: Model<Media>
    ) { }

    async uploadSingalImage(req, res, next) {
        return uploadSingle(req, res, () => {

            // 实体数据
            const originalName = req.file.originalname;
            const mimetype: string = req.file.mimetype;
            const size = req.file.size;
            const suffix = path.extname(req.file.originalname);
            if (Number(size) > 1024 * 1024) {
                return next(new BadRequestException('图片最大为 1M'));
            }
            if (!mimetype.includes('image')) {
                return next(new BadRequestException('只能上传图片类型，支持jpg,png'));
            }
            const name = md5(req.file.buffer);
            const fileName = name + suffix;
            const filePath = '/static/upload/' + new Date().getFullYear() + '/';

            // 图片处理
            const basePath = path.resolve(__dirname, `../../..` + filePath);

            /* istanbul ignore next */
            if (!fs.existsSync(basePath)) {
                fs.mkdirSync(basePath);
            }
            fs.writeFile(basePath + '/' + fileName, req.file.buffer, async () => {
                const file = await this.mediaModel.create({
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
            });
        });
    }

    async uploadStaticFile(req, res, next) {
        return uploadSingle(req, res, async (err) => {
            const originalName = req.file.originalname;
            const mimetype = req.file.mimetype;
            const size = req.file.size;
            const suffix = path.extname(req.file.originalname);
            const name = md5(req.file.buffer);
            const fileName = name + suffix;
            const filePath = '/static/upload/' + new Date().getFullYear() + '/';
            let category = 6;
            if (mimetype.toLowerCase().includes('mp4')) {
                category = 1;
            } else if (mimetype.toLowerCase().includes('mpeg')) {// mp3
                category = 2;
            }
            if (category === 6) {
                const imageTypes = ['png', 'jpg', 'jpeg'];
                imageTypes.forEach(item => {
                    if (mimetype.toLowerCase().includes(item)) {
                        category = 3;
                    }
                });
            }
            if (category === 6) {
                const docsTypes = ['txt', 'doc', 'docx', 'pdf'];
                docsTypes.forEach(item => {
                    if (mimetype.toLowerCase().includes(item)) {
                        category = 4;
                    }
                });
            }
            await fs.writeFileSync(path.resolve(__dirname, '../../..' + filePath) + '/' + fileName, req.file.buffer);
            if (req.query.parentId) {
                await this.fileModel.updateOne({ _id: req.query.parentId }, {
                    $inc: { fileCount: 1 }
                });
            }
            const file = await this.fileModel.create({
                originalName,
                name,
                mimetype,
                size,
                suffix,
                fileName,
                filePath,
                category,
                parentId: req.query.parentId || null
            });
            return res.json({
                _id: file._id,
                url: filePath + fileName
            });
        });
    }
}/* istanbul ignore next */

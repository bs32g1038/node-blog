import { Model } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { InjectModel } from '@nestjs/mongoose';
import { File } from '../../models/file.model';
import { Media } from '../../models/media.model';
import { md5 } from '../../utils/crypto.util';
import * as fs from 'fs';
import * as util from 'util';
import * as path from 'path';
import * as multr from 'multer';
const fswriteFile = util.promisify(fs.writeFile);

MulterModule.register({
    storage: multr.memoryStorage(),
});

@Injectable()
export class UploadService {
    public constructor(
        @InjectModel('file') private readonly fileModel: Model<File>,
        @InjectModel('media') private readonly mediaModel: Model<Media>
    ) {}

    public async uploadSingalImage(file: Express.Multer.File) {
        // 实体数据
        const originalName = file.originalname;
        const mimetype: string = file.mimetype;
        const size = file.size;
        const suffix = path.extname(file.originalname);
        if (Number(size) > 1024 * 1024) {
            throw new BadRequestException('图片最大为 1M');
        }
        if (!mimetype.includes('image')) {
            throw new BadRequestException('只能上传图片类型，支持jpg,png');
        }
        const name = md5(file.buffer);
        const fileName = name + suffix;
        const filePath = '/static/upload/' + new Date().getFullYear();

        // 图片处理
        const basePath = path.resolve(__dirname, `../../..` + filePath);
        /* istanbul ignore next */
        if (!fs.existsSync(basePath)) {
            fs.mkdirSync(basePath);
        }
        await fswriteFile(basePath + '/' + fileName, file.buffer);
        const _file = await this.mediaModel.create({
            originalName,
            name,
            mimetype,
            size,
            suffix,
            fileName,
            filePath,
            type: 'image',
        });
        const url = filePath + '/' + fileName;
        return {
            _id: _file._id,
            url,
        };
    }

    public async uploadStaticFile(file: Express.Multer.File, parentId = null) {
        const originalName = file.originalname;
        const mimetype = file.mimetype;
        const size = file.size;
        const suffix = path.extname(file.originalname);
        const name = md5(file.buffer);
        const fileName = name + suffix;
        const filePath = '/static/upload/' + new Date().getFullYear();
        let category = 6;
        if (mimetype.toLowerCase().includes('mp4')) {
            category = 1;
        } else if (mimetype.toLowerCase().includes('mpeg')) {
            // mp3
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
        const basePath = path.resolve(__dirname, `../../..` + filePath);
        /* istanbul ignore next */
        if (!fs.existsSync(basePath)) {
            fs.mkdirSync(basePath);
        }
        await fswriteFile(basePath + '/' + fileName, file.buffer);
        if (parentId) {
            await this.fileModel.updateOne(
                { _id: parentId },
                {
                    $inc: { fileCount: 1 },
                }
            );
        }
        const _file = await this.fileModel.create({
            originalName,
            name,
            mimetype,
            size,
            suffix,
            fileName,
            filePath,
            category,
            parentId: parentId || null,
        });
        return {
            _id: _file._id,
            url: filePath + fileName,
        };
    }
} /* istanbul ignore next */

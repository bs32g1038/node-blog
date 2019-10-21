import { Model } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { InjectModel } from '../../utils/model.util';
import { FileDocument, FileModel } from '../../models/file.model';
import { MediaDocument, MediaModel } from '../../models/media.model';
import { md5 } from '../../utils/crypto.util';
import fs from 'fs';
import util from 'util';
import path from 'path';
import multr from 'multer';
const fswriteFile = util.promisify(fs.writeFile);

MulterModule.register({
    storage: multr.memoryStorage(),
});

@Injectable()
export class UploadService {
    public constructor(
        @InjectModel(FileModel) private readonly fileModel: Model<FileDocument>,
        @InjectModel(MediaModel) private readonly mediaModel: Model<MediaDocument>
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
        const basePath = path.join(process.cwd(), `/public` + filePath);

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

    public async uploadStaticFile(file: Express.Multer.File, parentId: any = null) {
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
        const basePath = path.join(process.cwd(), `/public` + filePath);

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
}

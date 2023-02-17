import path from 'path';
import multr from 'multer';
import { Model } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { File, FileType, FileDocument } from '@blog/server/models/file.model';
import { MulterModule } from '@nestjs/platform-express';
import { md5 } from '@blog/server/utils/crypto.util';
import { creteUploadFile } from '@blog/server/utils/upload.util';
import { DynamicConfigService } from '@blog/server/modules/dynamic-config/dynamic.config.service';
import { InjectModel } from '@nestjs/mongoose';
import { IPaginate } from '@blog/server/mongoose/paginate';

MulterModule.register({
    storage: multr.memoryStorage(),
});

@Injectable()
export class FileService {
    FILE_TYPE_MAP_MIMETYPE = [
        {
            type: FileType.video,
            mimetypes: ['mp4', 'x-flv'],
        },
        {
            type: FileType.audio,
            mimetypes: ['mpeg', 'mp3'],
        },
        {
            type: FileType.image,
            mimetypes: ['png', 'jpg', 'jpeg', 'webp'],
        },
        {
            type: FileType.document,
            mimetypes: ['txt', 'doc', 'docx', 'pdf'],
        },
        {
            type: FileType.other,
            mimetypes: [],
        },
    ];
    constructor(
        @InjectModel(File.name) private readonly fileModel: Model<FileDocument> & IPaginate,
        private readonly configService: DynamicConfigService
    ) {}

    async getFileList(options: {
        page?: number;
        limit?: number;
        sort?: any;
    }): Promise<{ items: File[]; totalCount: number }> {
        const { page = 1, limit = 10, sort = { createdAt: -1 } } = options;
        return await this.fileModel.paginate({}, '', {
            page,
            limit,
            sort,
        });
    }

    async deleteFile(id: string) {
        const _file = await this.fileModel.findById(id);
        if (_file) {
            await this.fileModel.deleteOne({ _id: id });
        }
        return {};
    }

    public async batchDelete(fileIds: string[]) {
        return this.fileModel.deleteMany({ _id: { $in: fileIds } });
    }

    public async uploadFile(file: Express.Multer.File) {
        const mimetype = file.mimetype;
        const size = file.size;
        const name = md5(file.buffer);

        const suffix = path.extname(file.originalname);
        const fileName = name + suffix;
        const buf = file.buffer;
        let type = FileType.other;
        for (const item of this.FILE_TYPE_MAP_MIMETYPE) {
            const rs = item.mimetypes.some((t) => {
                return mimetype.toLocaleLowerCase().includes(t);
            });
            if (rs) {
                if (item.type === FileType.image) {
                    if (Number(size) > 1024 * 1024 * 2) {
                        throw new BadRequestException('图片最大为 2MB');
                    }
                }
                type = item.type;
                break;
            }
        }
        // 文件处理
        const domain = this.configService.siteDomain;
        const p = await creteUploadFile(fileName, buf);
        const url = domain + p;
        const result = await this.fileModel.findOneAndUpdate({ name: fileName }, { url });
        if (result) {
            return { ...result.toObject(), url };
        }
        const _file = await this.fileModel.create({
            name: fileName,
            originName: file.originalname,
            type,
            size,
            url,
        });
        return _file;
    }
}

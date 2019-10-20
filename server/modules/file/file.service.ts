import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '../../utils/model.util';
import { File, FileDocument, FileModel } from '../../models/file.model';

@Injectable()
export class FileService {
    constructor(@InjectModel(FileModel) private readonly fileModel: Model<FileDocument>) {}

    async create(newFile: File): Promise<File> {
        return await this.fileModel.create(newFile);
    }

    async update(id: string, data: File) {
        return await this.fileModel.findByIdAndUpdate({ _id: id }, data);
    }

    async getFiles(query: {}, option: { skip?: number; limit?: number; sort?: object }): Promise<File[]> {
        const { skip = 1, limit = 10, sort = {} } = option;
        const filter = { ...query };
        return await this.fileModel.find(
            filter,
            {},
            {
                skip: (skip - 1) * limit,
                limit,
                sort,
            }
        );
    }

    async getFile(id: string) {
        return await this.fileModel.findById(id);
    }

    async deleteFile(id: string) {
        const _file = await this.fileModel.findById(id);
        if (_file) {
            if (_file.parentId) {
                await this.fileModel.updateOne({ _id: _file.parentId }, { $inc: { fileCount: -1 } });
            }
            await this.fileModel.deleteOne({ _id: id });
        }
        return {};
    }

    public async batchDelete(fileIds: string[]) {
        return this.fileModel.deleteMany({ _id: { $in: fileIds } });
    }

    async count(query) {
        const filter = { ...query };
        return await this.fileModel.countDocuments(filter);
    }

    async createFolder(name: string, parentId: string) {
        return await this.fileModel.create({
            originalName: name,
            name,
            isdir: true,
            category: 6,
            parentId: parentId || null,
            mimetype: '*',
            size: 0,
            suffix: '*',
            fileName: '*',
            filePath: '*',
            fileCount: 0,
        });
    }
} /* istanbul ignore next */

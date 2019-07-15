import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { File } from '../../models/file.model';
import { CreateFileDto, UpdateFileDto } from './file.dto';

@Injectable()
export class FileService {
    constructor(@InjectModel('file') private readonly fileModel: Model<File>) {}

    async create(createFileDto: CreateFileDto): Promise<File> {
        const file: File = await this.fileModel.create(createFileDto);
        return file;
    }

    async update(id: string, data: UpdateFileDto) {
        const file: File = await this.fileModel.findByIdAndUpdate({ _id: id }, data);
        return file;
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

    async count(query) {
        const filter = { ...query };
        return await this.fileModel.countDocuments(filter);
    }

    async createFolder(name: string, parentId: string) {
        return await await this.fileModel.create({
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

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { File } from '../../models/file.model';
import { CreateFileDto, UpdateFileDto } from './file.dto';

@Injectable()
export class FileService {
    constructor(
        @InjectModel('file') private readonly fileModel: Model<File>
    ) { }

    async create(createFileDto: CreateFileDto): Promise<File> {
        const file: File = await this.fileModel.create(createFileDto);
        return file;
    }

    async update(id: string, data: UpdateFileDto) {
        const file: File = await this.fileModel.findByIdAndUpdate({ _id: id }, data);
        return file;
    }

    async getFiles(
        query: {},
        option: { skip?: number, limit?: number, sort?: object }
    ): Promise<File[]> {
        const { skip = 1, limit = 10, sort = {} } = option;
        const filter = { ...query };
        return await this.fileModel.find(filter, {}, {
            skip,
            limit,
            sort
        });
    }

    async getFile(id: string) {
        const file = await this.fileModel.findById(id);
        return file;
    }

    async deleteFile(id: string) {
        await this.fileModel.deleteOne({ _id: id });
        return {};
    }

    async count(query) {
        const filter = { ...query };
        return await this.fileModel.countDocuments(filter);
    }

}

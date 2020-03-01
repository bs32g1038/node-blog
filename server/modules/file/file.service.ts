import { Injectable } from '@nestjs/common';
import { InjectModel } from '../../utils/model.util';
import { File, FileModel, IFileModel } from '../../models/file.model';
import { QueryRules } from '../../utils/mongoose.query.util';

@Injectable()
export class FileService {
    constructor(@InjectModel(FileModel) private readonly fileModel: IFileModel) {}

    async create(newFile: File): Promise<File> {
        return await this.fileModel.create(newFile);
    }

    async update(id: string, data: File) {
        return await this.fileModel.findByIdAndUpdate({ _id: id }, data, { runValidators: true });
    }

    async getFileList(options: {
        parentId?: string;
        page?: number;
        limit?: number;
        sort?: {};
    }): Promise<{ items: File[]; totalCount: number }> {
        const { parentId, page = 1, limit = 10, sort = {} } = options;
        const q = new QueryRules({ parentId }, { parentId: (str: string) => ({ parentId: str }) }).generateQuery();
        return await this.fileModel.paginate(q, '', {
            page,
            limit,
            sort,
        });
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
}

import { Controller, Get, Post, Delete, Put, UseGuards } from '@nestjs/common';
import { FileService } from './file.service';
import { File, FileJoiSchema } from '../../models/file.model';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import Joi, {
    ObjectIdSchema,
    generateObjectIdsSchema,
    generateObjectIdSchema,
    StandardPaginationSchema,
} from '../../joi';
import { JoiParam, JoiQuery, JoiBody } from '../../decorators/joi.decorator';

@Controller('/api')
@UseGuards(RolesGuard)
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @Post('/files')
    @Roles('admin')
    async create(@JoiBody(FileJoiSchema) file: File) {
        return await this.fileService.create(file);
    }

    @Put('/files/:id')
    @Roles('admin')
    async update(@JoiParam(ObjectIdSchema) params: { id: string }, @JoiBody(FileJoiSchema) file: File) {
        return await this.fileService.update(params.id, file);
    }

    @Get('/files')
    @Roles('admin')
    async getFiles(
        @JoiQuery({ ...StandardPaginationSchema, ...generateObjectIdSchema('parentId') })
        query: {
            page: number;
            limit: number;
            parentId: string;
        }
    ) {
        const { items, totalCount } = await this.fileService.getFileList(query);
        return {
            items,
            totalCount,
        };
    }

    // 根据id，获取文件夹名称
    @Get('/files/getFolderName/:id')
    @Roles('admin')
    async getFile(@JoiParam(ObjectIdSchema) params: { id: string }): Promise<File | null> {
        return await this.fileService.getFile(params.id);
    }

    @Delete('/files/:id')
    @Roles('admin')
    async deleteFile(@JoiParam(ObjectIdSchema) params: { id: string }) {
        return await this.fileService.deleteFile(params.id);
    }

    @Post('/files/createFolder')
    @Roles('admin')
    async createFolder(
        @JoiBody({
            name: Joi.string()
                .min(1)
                .max(20),
            ...generateObjectIdSchema('parentId'),
        })
        body: {
            name: string;
            parentId: string;
        }
    ) {
        const { name, parentId } = body;
        return await this.fileService.createFolder(name, parentId);
    }

    @Delete('/files')
    @Roles('admin')
    deleteArticles(@JoiBody(generateObjectIdsSchema('fileIds')) body: { fileIds: string[] }): Promise<any> {
        return this.fileService.batchDelete(body.fileIds);
    }
}

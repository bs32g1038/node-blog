import { Controller, Get, Post, Delete, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import { ObjectIdSchema, generateObjectIdsSchema, generateObjectIdSchema, StandardPaginationSchema } from '../../joi';
import { JoiParam, JoiQuery, JoiBody } from '../../decorators/joi.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/api')
@UseGuards(RolesGuard)
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @Post('/files/upload')
    @Roles('admin')
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile() file: any) {
        return await this.fileService.uploadFile(file);
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

    @Delete('/files/:id')
    @Roles('admin')
    async deleteFile(@JoiParam(ObjectIdSchema) params: { id: string }) {
        return await this.fileService.deleteFile(params.id);
    }

    @Delete('/files')
    @Roles('admin')
    deleteArticles(@JoiBody(generateObjectIdsSchema('fileIds')) body: { fileIds: string[] }): Promise<any> {
        return this.fileService.batchDelete(body.fileIds);
    }
}

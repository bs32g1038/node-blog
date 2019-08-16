import { Controller, Get, Post, Body, Query, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { StandardPaginationSchema } from '../../validations/standard.pagination.validation';
import { FileService } from './file.service';
import { File } from '../../models/file.model';
import { JoiValidationPipe } from '../../pipes/joi.validation.pipe';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import * as Joi from '@hapi/joi';

@Controller('/api')
@UseGuards(RolesGuard)
export class FileController {
    constructor(private readonly fileService: FileService) {}

    public static idSchema = {
        id: Joi.string()
            .default('')
            .max(50),
    };

    public static folderSchema = {
        parentId: Joi.string()
            .default('')
            .max(50)
            .allow(''),
        name: Joi.string()
            .min(1)
            .max(50),
    };

    public static deleteFilesSchema = {
        fileIds: Joi.array().items(Joi.string().required()),
    };

    @Post('/files')
    @Roles('admin')
    async create(@Body() file: File) {
        return await this.fileService.create(file);
    }

    @Put('/files/:id')
    @Roles('admin')
    async update(@Param() params: { id: string }, @Body() file: File) {
        return await this.fileService.update(params.id, file);
    }

    @Get('/files')
    @Roles('admin')
    @JoiValidationPipe(StandardPaginationSchema)
    async getFiles(@Query() query: { page: number; limit: number; parentId: string }) {
        const items = await this.fileService.getFiles(
            { parentId: query.parentId },
            {
                skip: Number(query.page),
                limit: Number(query.limit),
            }
        );
        const totalCount = await this.fileService.count({ parentId: query.parentId });
        return {
            items,
            totalCount,
        };
    }

    // 根据id，获取文件夹名称
    @Get('/files/getFolderName/:id')
    @Roles('admin')
    @JoiValidationPipe(FileController.idSchema)
    async getFile(@Param() params: { id: string }): Promise<File> {
        return await this.fileService.getFile(params.id);
    }

    @Delete('/files/:id')
    @Roles('admin')
    @JoiValidationPipe(FileController.idSchema)
    async deleteFile(@Param() params: { id: string }) {
        return await this.fileService.deleteFile(params.id);
    }

    @Post('/files/createFolder')
    @Roles('admin')
    @JoiValidationPipe(FileController.folderSchema)
    async createFolder(@Body() body: { name: string; parentId: string }) {
        const { name, parentId } = body;
        return await this.fileService.createFolder(name, parentId);
    }

    @Delete('/files')
    @Roles('admin')
    @JoiValidationPipe(FileController.deleteFilesSchema)
    deleteArticles(@Body() body: { fileIds: string[] }): Promise<any> {
        return this.fileService.batchDelete(body.fileIds);
    }
}

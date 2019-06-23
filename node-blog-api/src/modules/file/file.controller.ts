import { Controller, Get, Post, Body, Query, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CreateFileDto, UpdateFileDto } from './file.dto';
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
    constructor(private readonly fileService: FileService) { }

    static idSchema = {
        id: Joi.string().default('').max(50)
    };

    @Post('/files')
    @Roles('admin')
    async create(@Body() createFileDto: CreateFileDto) {
        return await this.fileService.create(createFileDto);
    }

    @Put('/files/:id')
    @Roles('admin')
    async update(@Param() params: { id: string }, @Body() fileDto: UpdateFileDto) {
        return await this.fileService.update(params.id, fileDto);
    }

    @Get('/files')
    @Roles('admin')
    @JoiValidationPipe(StandardPaginationSchema)
    async getFiles(@Query() query: { page: number, limit: number, parentId: string }) {
        const items = await this.fileService.getFiles({ parentId: query.parentId }, {
            skip: Number(query.page),
            limit: Number(query.limit)
        });
        const totalCount = await this.fileService.count({ parentId: query.parentId });
        return {
            items,
            totalCount
        };
    }

    @Get('/files/getFolderName/:id')
    @JoiValidationPipe(FileController.idSchema)
    @Roles('admin')
    async getFile(@Param() params: { id: string }): Promise<File> {
        return await this.fileService.getFile(params.id);
    }

    @Delete('/files/:id')
    @JoiValidationPipe(FileController.idSchema)
    @Roles('admin')
    async deleteFile(@Param() params: { id: string }) {
        return await this.fileService.deleteFile(params.id);
    }
}

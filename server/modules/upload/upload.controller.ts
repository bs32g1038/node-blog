import { Controller, Post, UseGuards, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import { JoiValidationPipe } from '../../pipes/joi.validation.pipe';
import Joi from '@hapi/joi';

@Controller()
@UseGuards(RolesGuard)
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}

    static parentIdSchema = {
        parentId: Joi.string()
            .default('')
            .max(50)
            .allow(''),
    };

    @Post('/api/upload/image')
    @Roles('admin')
    @UseInterceptors(FileInterceptor('file'))
    async uploadSingalImage(@UploadedFile() file: any) {
        return await this.uploadService.uploadSingalImage(file);
    }

    @Post('/api/upload/static-files')
    @Roles('admin')
    @JoiValidationPipe(UploadController.parentIdSchema)
    @UseInterceptors(FileInterceptor('file'))
    async uploadStaticFile(@UploadedFile() file: any, @Query() query: { parentId: string }) {
        return await this.uploadService.uploadStaticFile(file, query.parentId);
    }
}

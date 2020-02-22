import { Controller, Post, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import { JoiQuery } from '../../decorators/joi.decorator';
import { generateObjectIdSchema } from '../../joi';

@Controller()
@UseGuards(RolesGuard)
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}

    @Post('/api/upload/image')
    @Roles('admin')
    @UseInterceptors(FileInterceptor('file'))
    async uploadSingalImage(@UploadedFile() file: any) {
        return await this.uploadService.uploadSingalImage(file);
    }

    @Post('/api/upload/static-files')
    @Roles('admin')
    @UseInterceptors(FileInterceptor('file'))
    async uploadStaticFile(
        @UploadedFile() file: any,
        @JoiQuery(generateObjectIdSchema('parentId')) query: { parentId: string }
    ) {
        return await this.uploadService.uploadStaticFile(file, query.parentId);
    }
}

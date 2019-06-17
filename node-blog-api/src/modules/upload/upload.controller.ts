import { Controller, Post, UseGuards, Req, Res, Next } from '@nestjs/common';
import { UploadService } from './upload.service';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import { Request, Response, NextFunction } from 'express';

@Controller()
@UseGuards(RolesGuard)
export class UploadController {
    constructor(private readonly uploadService: UploadService) { }

    @Post('/api/upload/image')
    @Roles('admin')
    async uploadSingalImage(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
        return await this.uploadService.uploadSingalImage(req, res, next);
    }

    @Post('/api/upload/static-files')
    // @Roles('admin')
    async uploadStaticFile(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
        return await this.uploadService.uploadStaticFile(req, res, next);
    }
}

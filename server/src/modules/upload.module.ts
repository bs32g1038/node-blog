import { Module } from '@nestjs/common';
import { UploadController } from './upload/upload.controller';
import { UploadService } from './upload/upload.service';
import { FileModelProvider } from '../models/file.model';
import { MediaModelProvider } from '../models/media.model';

@Module({
    controllers: [UploadController],
    providers: [MediaModelProvider, FileModelProvider, UploadService],
})
export class UploadModule {}

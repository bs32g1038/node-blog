import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadController } from './upload/upload.controller';
import { UploadService } from './upload/upload.service';
import { FileSchema } from '../models/file.model';
import { MediaSchema } from '../models/media.model';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'file', schema: FileSchema, collection: 'file' },
            { name: 'media', schema: MediaSchema, collection: 'media' },
        ]),
    ],
    controllers: [UploadController],
    providers: [UploadService],
})
export class UploadModule {}

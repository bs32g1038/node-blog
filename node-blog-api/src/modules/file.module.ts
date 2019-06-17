import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileController } from './file/file.controller';
import { FileService } from './file/file.service';
import { FileSchema } from '../models/file.model';

@Module({
    imports: [MongooseModule.forFeature([
        { name: 'file', schema: FileSchema, collection: 'file' }
    ])],
    controllers: [FileController],
    providers: [FileService]
})
export class FileModule { }

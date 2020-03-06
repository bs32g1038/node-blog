import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { FileModelProvider } from '../../models/file.model';

@Module({
    controllers: [FileController],
    providers: [FileModelProvider, FileService],
})
export class FileModule {}

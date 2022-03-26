import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { FileModelModule } from '../../models/file.model';

@Module({
    imports: [FileModelModule],
    controllers: [FileController],
    providers: [FileService],
})
export class FileModule {}

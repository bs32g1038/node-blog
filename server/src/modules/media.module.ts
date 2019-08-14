import { Module } from '@nestjs/common';
import { MediaController } from './media/media.controller';
import { MediaService } from './media/media.service';
import { MediaModelProvider } from '../models/media.model';

@Module({
    controllers: [MediaController],
    providers: [MediaModelProvider, MediaService],
})
export class MediaModule {}

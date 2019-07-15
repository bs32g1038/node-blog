import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MediaController } from './media/media.controller';
import { MediaService } from './media/media.service';
import { MediaSchema } from '../models/media.model';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'media', schema: MediaSchema, collection: 'media' }])],
    controllers: [MediaController],
    providers: [MediaService],
})
export class MediaModule {}

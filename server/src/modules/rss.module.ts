import { Module } from '@nestjs/common';
import { RssController } from './rss/rss.controller';
import { RssService } from './rss/rss.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from '../models/article.model';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'article', schema: ArticleSchema, collection: 'article' }])],
    controllers: [RssController],
    providers: [RssService],
})
export class RssModule {}

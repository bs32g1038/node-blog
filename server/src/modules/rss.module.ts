import { Module } from '@nestjs/common';
import { RssController } from './rss/rss.controller';
import { RssService } from './rss/rss.service';
import { ArticleModelProvider } from '../models/article.model';

@Module({
    controllers: [RssController],
    providers: [ArticleModelProvider, RssService],
})
export class RssModule {}

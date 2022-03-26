import { Module } from '@nestjs/common';
import { RssController } from './rss.controller';
import { RssService } from './rss.service';
import { ArticleModelModule } from '../../models/article.model';

@Module({
    imports: [ArticleModelModule],
    controllers: [RssController],
    providers: [RssService],
})
export class RssModule {}

import { Module } from '@nestjs/common';
import { SearchController } from './search/search.controller';
import { SearchService } from './search/search.service';
import { ArticleModelProvider } from '../models/article.model';

@Module({
    controllers: [SearchController],
    providers: [ArticleModelProvider, SearchService],
})
export class SearchModule {}

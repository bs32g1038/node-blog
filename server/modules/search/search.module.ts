import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { ArticleModelModule } from '../../models/article.model';

@Module({
    imports: [ArticleModelModule],
    controllers: [SearchController],
    providers: [SearchService],
})
export class SearchModule {}

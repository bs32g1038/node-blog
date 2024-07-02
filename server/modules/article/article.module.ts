import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleModelModule } from '../../models/article.model';
import { CategoryModelModule } from '../../models/category.model';
import { DraftModelModule } from '@blog/server/models/draft.model';

@Module({
    imports: [ArticleModelModule, CategoryModelModule, DraftModelModule],
    controllers: [ArticleController],
    providers: [ArticleService],
})
export class ArticleModule {}

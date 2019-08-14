import { Module } from '@nestjs/common';
import { ArticleController } from './article/article.controller';
import { ArticleService } from './article/article.service';
import { ArticleModelProvider } from '../models/article.model';
import { CategoryModelProvider } from '../models/category.model';

@Module({
    controllers: [ArticleController],
    providers: [ArticleModelProvider, CategoryModelProvider, ArticleService],
})
export class ArticleModule {}

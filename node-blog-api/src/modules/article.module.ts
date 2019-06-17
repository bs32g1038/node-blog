import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleController } from './article/article.controller';
import { ArticleService } from './article/article.service';
import { ArticleSchema } from '../models/article.model';
import { CategorySchema } from '../models/category.model';

@Module({
    imports: [MongooseModule.forFeature([
        { name: 'article', schema: ArticleSchema, collection: 'article' },
        { name: 'category', schema: CategorySchema, collection: 'category' }
    ])],
    controllers: [ArticleController],
    providers: [ArticleService]
})
export class ArticleModule { }

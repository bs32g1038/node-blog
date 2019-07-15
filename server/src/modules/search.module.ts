import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchController } from './search/search.controller';
import { SearchService } from './search/search.service';
import { ArticleSchema } from '../models/article.model';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'article', schema: ArticleSchema, collection: 'article' }])],
    controllers: [SearchController],
    providers: [SearchService],
})
export class SearchModule {}

import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard/dashboard.controller';
import { DashboardService } from './dashboard/dashboard.service';
import { CommentSchema } from '../models/comment.model';
import { ArticleSchema } from '../models/article.model';
import { CategorySchema } from '../models/category.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'article', schema: ArticleSchema, collection: 'article' },
            { name: 'comment', schema: CommentSchema, collection: 'comment' },
            { name: 'category', schema: CategorySchema, collection: 'category' },
        ]),
    ],
    controllers: [DashboardController],
    providers: [DashboardService],
})
export class DashboardModule {}

import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { CommentModelProvider } from '../../models/comment.model';
import { ArticleModelProvider } from '../../models/article.model';
import { CategoryModelProvider } from '../../models/category.model';

@Module({
    controllers: [DashboardController],
    providers: [ArticleModelProvider, CategoryModelProvider, CommentModelProvider, DashboardService],
})
export class DashboardModule {}

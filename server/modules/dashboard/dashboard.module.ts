import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { CommentModelModule } from '../../models/comment.model';
import { ArticleModelModule } from '../../models/article.model';
import { CategoryModelModule } from '../../models/category.model';

@Module({
    imports: [CommentModelModule, ArticleModelModule, CategoryModelModule],
    controllers: [DashboardController],
    providers: [DashboardService],
})
export class DashboardModule {}

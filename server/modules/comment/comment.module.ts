import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentModelModule } from '../../models/comment.model';
import { ArticleModelModule } from '../../models/article.model';
import { UserModelModule } from '@blog/server/models/user.model';

@Module({
    imports: [CommentModelModule, ArticleModelModule, UserModelModule],
    controllers: [CommentController],
    providers: [CommentService],
})
export class CommentModule {}

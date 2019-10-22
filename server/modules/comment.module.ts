import { Module } from '@nestjs/common';
import { CommentController } from './comment/comment.controller';
import { CommentService } from './comment/comment.service';
import { CommentModelProvider } from '../models/comment.model';
import { ArticleModelProvider } from '../models/article.model';

@Module({
    controllers: [CommentController],
    providers: [ArticleModelProvider, CommentModelProvider, CommentService],
})
export class CommentModule {}

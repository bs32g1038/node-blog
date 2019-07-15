import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentController } from './comment/comment.controller';
import { CommentService } from './comment/comment.service';
import { CommentSchema } from '../models/comment.model';
import { ArticleSchema } from '../models/article.model';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'article', schema: ArticleSchema, collection: 'article' },
            { name: 'comment', schema: CommentSchema, collection: 'comment' },
        ]),
    ],
    controllers: [CommentController],
    providers: [CommentService],
})
export class CommentModule {}

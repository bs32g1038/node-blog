import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentController } from './comment/comment.controller';
import { CommentService } from './comment/comment.service';
import { CommentSchema } from '../models/comment.model';
import { ArticleSchema } from '../models/article.model';
import RateLimit from '../utils/rate-limit.util';
import config from '../configs/index.config';

@Module({
    imports: [MongooseModule.forFeature([
        { name: 'article', schema: ArticleSchema, collection: 'article' },
        { name: 'comment', schema: CommentSchema, collection: 'comment' }
    ])],
    controllers: [CommentController],
    providers: [CommentService]
})
export class CommentModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(RateLimit({
                name: 'comment',
                errorMsg: '你今天已经到达最大的评论次数，谢谢你对本博客的支持！',
                limitCount: config.max_guestbook_per_day,
                expired: 24 * 60 * 60,
                showJson: true
            }))
            .forRoutes({ path: '/api/comments', method: RequestMethod.POST });
    }
}

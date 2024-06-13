import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AdminLogModule } from './modules/loginlog/loginlog.module';
import { ArticleModule } from './modules/article/article.module';
import { CategoryModule } from './modules/category/category.module';
import { CommentModule } from './modules/comment/comment.module';
import { FileModule } from './modules/file/file.module';
import { RssModule } from './modules/rss/rss.module';
import { SearchModule } from './modules/search/search.module';
import { UserModule } from './modules/user/user.module';
import { RateLimitMiddleware } from './middlewares/rate-limit.middleware';
import { isProdMode, MONGODB } from './configs/index.config';
import { TasksModule } from './modules/tasks/tasks.module';

import { SSRModule } from '@blog/client/server';
import { MongooseModule } from '@nestjs/mongoose';
import { DynamicConfigModule } from './modules/dynamic-config/dynamic.config.module';
import { DraftModule } from './modules/draft/draft.module';

@Module({
    imports: [
        MongooseModule.forRoot(MONGODB.uri),
        DynamicConfigModule,
        AdminLogModule,
        ArticleModule,
        CategoryModule,
        CommentModule,
        FileModule,
        RssModule,
        SearchModule,
        UserModule,
        DraftModule,
        ...(isProdMode ? [ScheduleModule.forRoot(), TasksModule] : []),
        ...(isProdMode ? [SSRModule.forRoot()] : []),
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RateLimitMiddleware).forRoutes('api');
    }
}

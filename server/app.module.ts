import { Module } from '@nestjs/common';
import { EmailModule } from './modules/email/email.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AdminLogModule } from './modules/adminlog/adminlog.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ArticleModule } from './modules/article/article.module';
import { CategoryModule } from './modules/category/category.module';
import { CommentModule } from './modules/comment/comment.module';
import { FileModule } from './modules/file/file.module';
import { RssModule } from './modules/rss/rss.module';
import { LoginModule } from './modules/login/login.module';
import { SearchModule } from './modules/search/search.module';
import { UserModule } from './modules/user/user.module';
import { RateLimitMiddleware } from './middlewares/rate-limit.middleware';
import { NestModule, MiddlewareConsumer } from '@nestjs/common';
import { isProdMode, MONGODB } from './configs/index.config';
import { TasksModule } from './modules/tasks/tasks.module';

import { SSRModule } from '@blog/client/server';
import { ExploreModule } from './modules/explore/explore.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DynamicConfigModule } from './modules/dynamic-config/dynamic.config.module';

@Module({
    imports: [
        MongooseModule.forRoot(MONGODB.uri),
        DynamicConfigModule,
        EmailModule,
        AdminLogModule,
        DashboardModule,
        ArticleModule,
        CategoryModule,
        CommentModule,
        FileModule,
        RssModule,
        LoginModule,
        SearchModule,
        UserModule,
        ExploreModule,
        ...(isProdMode ? [ScheduleModule.forRoot(), TasksModule] : []),
        ...(isProdMode ? [SSRModule.forRoot()] : []),
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RateLimitMiddleware).forRoutes('api');
    }
}

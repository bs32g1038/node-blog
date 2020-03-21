import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './modules/app-config/app.config.module';
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
import { isProdMode } from './configs/index.config';
import { siteConfig } from './modules/app-config/app.config.service';
import { TasksModule } from './modules/tasks/tasks.module';

import { SSRModule } from '@blog/client/server';

@Module({
    imports: [
        DatabaseModule,
        ConfigModule.forRoot({
            ignoreEnvFile: true,
            isGlobal: true,
            load: [siteConfig],
        }),
        AppConfigModule,
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
        ...(isProdMode ? [ScheduleModule.forRoot(), TasksModule] : []),
        ...(isProdMode ? [SSRModule.forRoot()] : []),
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RateLimitMiddleware).forRoutes('api');
    }
}

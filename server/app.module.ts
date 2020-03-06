import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { SiteConfigModule } from '@blog/server/configs/site.config.module';
import { AdminLogModule } from './modules/adminlog/adminlog.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ArticleModule } from './modules/article/article.module';
import { CategoryModule } from './modules/category/category.module';
import { AboutModule } from './modules/about/about.module';
import { CommentModule } from './modules/comment/comment.module';
import { DemoModule } from './modules/demo/demo.module';
import { FileModule } from './modules/file/file.module';
import { RssModule } from './modules/rss/rss.module';
import { LoginModule } from './modules/login/login.module';
import { SearchModule } from './modules/search/search.module';
import { UserModule } from './modules/user/user.module';
import { WriteDayReadingModule } from './modules/write.day.reading.module';
import { RateLimitMiddleware } from './middlewares/rate-limit.middleware';
import { SSRModule } from '@blog/client/server';
import { NestModule, MiddlewareConsumer } from '@nestjs/common';
import { isProdMode } from './configs/index.config';

@Module({
    imports: [
        DatabaseModule,
        SiteConfigModule,
        AdminLogModule,
        DashboardModule,
        ArticleModule,
        CategoryModule,
        AboutModule,
        CommentModule,
        DemoModule,
        FileModule,
        RssModule,
        LoginModule,
        SearchModule,
        UserModule,
        WriteDayReadingModule,
        ...(isProdMode ? [SSRModule.forRoot()] : []),
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RateLimitMiddleware).forRoutes('api');
    }
}

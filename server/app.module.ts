import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { SiteConfigModule } from './site-config/site.config.module';
import { AdminLogModule } from './modules/adminlog.module';
import { DashboardModule } from './modules/dashboard.module';
import { ArticleModule } from './modules/article.module';
import { CategoryModule } from './modules/category.module';
import { AboutModule } from './modules/about.module';
import { CommentModule } from './modules/comment.module';
import { DemoModule } from './modules/demo.module';
import { FileModule } from './modules/file.module';
import { MediaModule } from './modules/media.module';
import { RssModule } from './modules/rss.module';
import { LoginModule } from './modules/login.module';
import { SearchModule } from './modules/search.module';
import { UserModule } from './modules/user.module';
import { WriteDayReadingModule } from './modules/write.day.reading.module';
import { RateLimitMiddleware } from './middlewares/rate-limit.middleware';
import { SSRModule } from '../client/server';
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
        MediaModule,
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

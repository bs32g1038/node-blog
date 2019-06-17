import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleModule } from './modules/article.module';
import { CategoryModule } from './modules/category.module';
import { AboutModule } from './modules/about.module';
import { CommentModule } from './modules/comment.module';
import { DemoModule } from './modules/demo.module';
import { FileModule } from './modules/file.module';
import { MediaModule } from './modules/media.module';
import { RssModule } from './modules/rss.module';
import { LoginModule } from './modules/login.module';
import { UploadModule } from './modules/upload.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/dev', { useNewUrlParser: true }),
        ArticleModule,
        CategoryModule,
        AboutModule,
        CommentModule,
        DemoModule,
        FileModule,
        MediaModule,
        RssModule,
        LoginModule,
        UploadModule
    ]
})
export class AppModule { }

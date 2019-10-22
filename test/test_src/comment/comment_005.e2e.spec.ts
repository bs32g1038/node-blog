import request from 'supertest';
import { CommentModule } from '../../../server/modules/comment.module';
import { ArticleModule } from '../../../server/modules/article.module';
import { ArticleService } from '../../../server/modules/article/article.service';
import { LoginModule } from '../../../server/modules/login.module';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';
import mongoose from 'mongoose';

describe('comment_005', () => {
    let app: INestApplication;

    const time = new Date().toISOString();
    const article = {
        _id: mongoose.Types.ObjectId(),
        isDraft: false,
        commentCount: 1,
        viewsCount: 1,
        isDeleted: false,
        title: 'test',
        content: 'test',
        summary: 'test',
        screenshot: 'http://www.lizc.net/static/upload/2019/027c4f5561d385b0b0a5338706694570.jpg',
        category: '5c0a1317244b3c01b464a3ec',
        createdAt: time,
        updatedAt: time,
        __v: 0,
    };

    beforeAll(async () => {
        app = await initApp({
            imports: [CommentModule, ArticleModule, LoginModule],
        });
        const articleService = app.get<ArticleService>(ArticleService);
        await articleService.create(article);
    });

    const comment = {
        _id: mongoose.Types.ObjectId(),
        pass: true,
        identity: 0,
        nickName: 'test',
        email: 'test@test.com',
        content: 'test',
        article: article._id,
        website: 'http://www.test.com',
        __v: 0,
    };

    it('/POST /api/comments 201', async () => {
        return request(app.getHttpServer())
            .post('/api/comments')
            .set('authorization', __TOKEN__)
            .send(comment)
            .expect(201);
    });

    it('/DELETE /api/comments 200 []', async () => {
        return request(app.getHttpServer())
            .delete('/api/comments')
            .set('authorization', __TOKEN__)
            .expect(200);
    });

    it('/DELETE /api/comments 400 []', async () => {
        return request(app.getHttpServer())
            .delete('/api/comments')
            .set('authorization', __TOKEN__)
            .send({
                commentIds: [],
            })
            .expect(400);
    });

    it('/DELETE /api/comments 200', async () => {
        return request(app.getHttpServer())
            .get('/api/comments')
            .send({
                commentIds: [comment._id],
            })
            .set('authorization', __TOKEN__)
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});

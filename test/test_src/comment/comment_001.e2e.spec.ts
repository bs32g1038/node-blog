import request from 'supertest';
import { CommentModule } from '../../../server/modules/comment.module';
import { ArticleModule } from '../../../server/modules/article.module';
import { ArticleService } from '../../../server/modules/article/article.service';
import { LoginModule } from '../../../server/modules/login.module';
import { INestApplication } from '@nestjs/common';
import { ADMIN_USER_INFO } from '../../../server/configs/index.config';
import { initApp } from '../../util';
import mongoose from 'mongoose';

describe('comment_001', () => {
    let app: INestApplication;

    const time = new Date().toISOString();
    const article = {
        _id: mongoose.Types.ObjectId().toString(),
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
        _id: mongoose.Types.ObjectId().toString(),
        pass: true,
        identity: 0,
        nickName: 'test',
        email: 'test@test.com',
        content: 'test',
        reply: '5c404fe4d7264e6bd09fbbfa',
        article: article._id,
        website: 'http://www.test.com',
        createdAt: time,
        updatedAt: time,
        __v: 0,
    };

    it('/PUT -- /api/comments/:id 403', async () => {
        return request(app.getHttpServer())
            .put('/api/comments/' + comment._id)
            .send(comment)
            .expect(403);
    });

    it('/DELETE /api/comments/:id 403', async () => {
        return request(app.getHttpServer())
            .delete('/api/comments/' + comment._id)
            .expect(403);
    });

    it('/POST /api/comments 200', async () => {
        return request(app.getHttpServer())
            .post('/api/comments')
            .send(comment)
            .expect(201)
            .then(res => {
                const a = res.body;
                expect(a._id).toEqual(comment._id);
                expect(a.pass).toEqual(comment.pass);
                expect(a.identity).toEqual(0);
                expect(a.nickName).toEqual(comment.nickName);
                expect(a.content).toEqual(comment.content);
                expect(a.reply).toEqual(comment.reply);
                expect(a.article).toEqual(comment.article);
                expect(a.website).toEqual(comment.website);
                expect(a.createdAt).toEqual(comment.createdAt);
                expect(a.updatedAt).toEqual(comment.updatedAt);
                expect(a.__v).toEqual(comment.__v);
            });
    });

    it('/POST /api/comments 200', async () => {
        return request(app.getHttpServer())
            .post('/api/comments')
            .set('authorization', __TOKEN__)
            .send({
                ...comment,
                _id: '5c0f3e2b25349c1270e3a44c',
            })
            .expect(201)
            .then(res => {
                const a = res.body;
                expect(a._id).toEqual('5c0f3e2b25349c1270e3a44c');
                expect(a.pass).toEqual(comment.pass);
                expect(a.identity).toEqual(1);
                expect(a.nickName).toEqual(ADMIN_USER_INFO.nickName);
                expect(a.content).toEqual(comment.content);
                expect(a.reply).toEqual(comment.reply);
                expect(a.article).toEqual(comment.article);
                expect(a.website).toEqual(comment.website);
                expect(a.createdAt).toEqual(comment.createdAt);
                expect(a.updatedAt).toEqual(comment.updatedAt);
                expect(a.__v).toEqual(comment.__v);
            });
    });

    it('/GET /api/comments 200', async () => {
        return request(app.getHttpServer())
            .get('/api/comments')
            .expect(200)
            .then(res => {
                expect(res.body.totalCount).toBeGreaterThanOrEqual(2);
                const arr = res.body.items.filter(item => {
                    return item._id === comment._id;
                });
                const a = arr[0];
                expect(a._id).toEqual(comment._id);
                expect(a.pass).toEqual(comment.pass);
                expect(a.identity).toEqual(comment.identity);
                expect(a.nickName).toEqual(comment.nickName);
                expect(a.content).toEqual(comment.content);
                expect(a.reply).toEqual(null);
                expect(a.article).toEqual({ _id: comment.article, title: article.title });
                expect(a.website).toEqual(comment.website);
                expect(a.createdAt).toEqual(comment.createdAt);
                expect(a.updatedAt).toEqual(comment.updatedAt);
                expect(a.__v).toEqual(comment.__v);
            });
    });

    it('/GET /api/comments/:id 200', async () => {
        return request(app.getHttpServer())
            .get('/api/comments/' + comment._id)
            .expect(200)
            .then(res => {
                const a = res.body;
                expect(a._id).toEqual(comment._id);
                expect(a.pass).toEqual(comment.pass);
                expect(a.identity).toEqual(0);
                expect(a.nickName).toEqual(comment.nickName);
                expect(a.content).toEqual(comment.content);
                expect(a.reply).toEqual(comment.reply);
                expect(a.article).toEqual({ _id: comment.article, title: article.title });
                expect(a.website).toEqual(comment.website);
                expect(a.createdAt).toEqual(comment.createdAt);
                expect(a.updatedAt).toEqual(comment.updatedAt);
                expect(a.__v).toEqual(comment.__v);
            });
    });

    it('/PUT /api/comments 200', async () => {
        return request(app.getHttpServer())
            .put('/api/comments/' + comment._id)
            .set('authorization', __TOKEN__)
            .send(comment)
            .expect(200)
            .then(res => {
                const a = res.body;
                expect(a._id).toEqual(comment._id);
                expect(a.pass).toEqual(comment.pass);
                expect(a.identity).toEqual(comment.identity);
                expect(a.nickName).toEqual(comment.nickName);
                expect(a.content).toEqual(comment.content);
                expect(a.reply).toEqual(comment.reply);
                expect(a.article).toEqual(comment.article);
                expect(a.website).toEqual(comment.website);
                expect(a.createdAt).toEqual(comment.createdAt);
                expect(new Date(a.updatedAt).getTime()).toBeGreaterThanOrEqual(new Date(comment.updatedAt).getTime());
                expect(a.__v).toEqual(comment.__v);
            });
    });

    it('/DELETE /api/comments/:id 200', async () => {
        return request(app.getHttpServer())
            .delete('/api/comments/' + comment._id)
            .set('authorization', __TOKEN__)
            .expect(200)
            .expect({});
    });

    afterAll(async () => {
        await app.close();
    });
});

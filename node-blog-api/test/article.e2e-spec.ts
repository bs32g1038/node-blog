import * as request from 'supertest';
import { ArticleModule } from '../src/modules/article.module';
import { LoginModule } from '../src/modules/login.module';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import config from '../src/configs/index.config';
import { getToken } from './util';
import * as mongoose from 'mongoose';

describe('ArticleController', () => {
    let app: INestApplication;
    let token: string;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot(config.test_db.uri, { useNewUrlParser: true }),
                ArticleModule,
                LoginModule
            ]
        }).compile();
        app = module.createNestApplication();
        await app.init();
        token = await getToken(app);
    });
    const time = new Date().toISOString();
    const article = {
        _id: '5c0f3e2b25349c1270e7a4ec',
        isDraft: false,
        commentCount: 9,
        viewsCount: 639,
        isDeleted: false,
        title: 'test',
        content: 'test',
        summary: 'summary',
        screenshot: '/static/images/default.jpg',
        category: '5c0a1317244b3c01b464a3ec',
        createdAt: time,
        updatedAt: time,
        __v: 0
    };

    it('/POST /api/articles 403', async () => {
        return request(app.getHttpServer())
            .post('/api/articles')
            .send(article)
            .expect(403);
    });

    it('/PUT /api/articles/:id 403', async () => {
        return request(app.getHttpServer())
            .put('/api/articles/' + article._id)
            .send(article)
            .expect(403);
    });

    it('/DELETE /api/articles/:id 403', async () => {
        return request(app.getHttpServer())
            .delete('/api/articles/' + article._id)
            .expect(403);
    });

    it('/POST /api/articles 200', async () => {
        return request(app.getHttpServer())
            .post('/api/articles')
            .set('authorization', token)
            .send(article)
            .expect(201)
            .expect(article);
    });

    it('/GET /api/articles 200', async () => {
        return request(app.getHttpServer())
            .get('/api/articles')
            .expect(200)
            .then(res => {
                expect(res.body.totalCount).toEqual(1);
                const a = res.body.items[0];
                expect(a._id).toEqual(article._id);
                expect(a.isDraft).toEqual(article.isDraft);
                expect(a.commentCount).toEqual(article.commentCount);
                expect(a.viewsCount).toEqual(article.viewsCount);
                expect(a.isDeleted).toEqual(article.isDeleted);
                expect(a.title).toEqual(article.title);
                expect(a.summary).toEqual(article.summary);
                expect(a.screenshot).toEqual(article.screenshot);
                expect(a.category).toEqual(null);
                expect(a.createdAt).toEqual(article.createdAt);
                expect(a.updatedAt).toEqual(article.updatedAt);
                expect(a.__v).toEqual(article.__v);
            });
    });

    it('/GET /api/articles/:id 200', async () => {
        return request(app.getHttpServer())
            .get('/api/articles/' + article._id)
            .expect(200)
            .then(res => {
                const a = res.body;
                expect(a._id).toEqual(article._id);
                expect(a.isDraft).toEqual(article.isDraft);
                expect(a.commentCount).toEqual(article.commentCount);
                expect(a.viewsCount).toEqual(article.viewsCount);
                expect(a.isDeleted).toEqual(article.isDeleted);
                expect(a.title).toEqual(article.title);
                expect(a.content).toEqual(article.content);
                expect(a.summary).toEqual(article.summary);
                expect(a.screenshot).toEqual(article.screenshot);
                expect(a.category).toEqual(null);
                expect(a.createdAt).toEqual(article.createdAt);
                expect(a.updatedAt).toEqual(article.updatedAt);
                expect(a.__v).toEqual(article.__v);
            });
    });

    it('/GET /api/recentArticles 200', async () => {
        return request(app.getHttpServer())
            .get('/api/recentArticles')
            .expect(200)
            .expect([{
                _id: article._id,
                title: article.title,
                screenshot: article.screenshot,
                createdAt: article.createdAt
            }]);
    });

    it('/PUT /api/articles 200', async () => {
        return request(app.getHttpServer())
            .put('/api/articles/' + article._id)
            .set('authorization', token)
            .send(article)
            .expect(200)
            .then(res => {
                const a = res.body;
                expect(a._id).toEqual(article._id);
                expect(a.isDraft).toEqual(article.isDraft);
                expect(a.commentCount).toEqual(article.commentCount);
                expect(a.viewsCount).toEqual(article.viewsCount + 1);
                expect(a.isDeleted).toEqual(article.isDeleted);
                expect(a.title).toEqual(article.title);
                expect(a.summary).toEqual(article.summary);
                expect(a.screenshot).toEqual(article.screenshot);
                expect(a.category).toEqual(article.category);
                expect(a.createdAt).toEqual(article.createdAt);
                expect(new Date(a.updatedAt).getTime()).toBeGreaterThan(new Date(article.updatedAt).getTime());
                expect(a.__v).toEqual(article.__v);
            });
    });

    it('/DELETE /api/articles/:id 200', async () => {
        return request(app.getHttpServer())
            .delete('/api/articles/' + article._id)
            .set('authorization', token)
            .expect(200)
            .expect({});
    });

    afterAll(async () => {
        await app.close();
        await mongoose.connection.close();
    });
});

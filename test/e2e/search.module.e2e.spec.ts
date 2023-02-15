import request from 'supertest';
import { SearchModule } from '@blog/server/modules/search/search.module';
import { INestApplication } from '@nestjs/common';
import { initApp, generateDataList } from '../util';
import { getArticle } from '../faker';
import { Connection, Model } from 'mongoose';
import { Article } from '@blog/server/models/article.model';
import { MongoMemoryServer } from 'mongodb-memory-server';

/**
 * 搜索模块 api 测试
 */
describe('search.module.e2e', () => {
    let app: INestApplication;
    let mongod: MongoMemoryServer;
    let mongooseConnection: Connection;
    let articleModel: Model<Article>;

    beforeAll(async () => {
        const instance = await initApp({
            imports: [SearchModule],
        });
        app = instance.app;
        mongod = instance.mongod;
        mongooseConnection = instance.mongooseConnection;
        articleModel = instance.articleModel;
    });

    test('get search result list success, default empty query', async () => {
        const articles = generateDataList(() => getArticle(), 10);
        await articleModel.create(articles);

        return request(app.getHttpServer())
            .get('/api/search')
            .expect(200)
            .then((res) => {
                expect(Array.isArray(res.body.items)).toEqual(true);
                expect(res.body.items.length).toBeGreaterThanOrEqual(4);
                expect(res.body.totalCount).toBeGreaterThanOrEqual(4);
            });
    });

    test('get search result list success, when key is empty', async () => {
        const articles = generateDataList(() => getArticle(), 10);
        await articleModel.create(articles);

        return request(app.getHttpServer())
            .get('/api/search?')
            .query({ key: '' })
            .expect(200)
            .then((res) => {
                expect(Array.isArray(res.body.items)).toEqual(true);
                expect(res.body.items.length).toBeGreaterThanOrEqual(4);
                expect(res.body.totalCount).toBeGreaterThanOrEqual(4);
            });
    });

    test('get search result list success, when the key min length is 1 & max length is 10', async () => {
        const articles = generateDataList(() => getArticle(), 10);
        await articleModel.create(articles);

        const title = articles[0].title.slice(0, 10);

        return request(app.getHttpServer())
            .get('/api/search?')
            .query({ key: title })
            .expect(200)
            .then((res) => {
                expect(Array.isArray(res.body.items)).toEqual(true);
                expect(res.body.items.length).toBeGreaterThanOrEqual(1);
                expect(res.body.totalCount).toBeGreaterThanOrEqual(1);
            });
    });

    test('bad request, get search result list failure, when the key length over 10', async () => {
        const articles = generateDataList(() => getArticle(), 10);
        await articleModel.create(articles);

        const title = articles[0].title + '1234567890';

        return request(app.getHttpServer()).get('/api/search?').query({ key: title }).expect(400);
    });

    afterAll(async () => {
        await app.close();
        await mongooseConnection.dropDatabase();
        await mongooseConnection.close();
        await mongod.stop();
    });
});

import request from 'supertest';
import { RssModule } from '@blog/server/modules/rss/rss.module';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../util';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection } from 'mongoose';

/**
 * rss模块 api 测试
 */
describe('rss.module.e2e', () => {
    let app: INestApplication;
    let mongod: MongoMemoryServer;
    let mongooseConnection: Connection;

    beforeAll(async () => {
        const instance = await initApp({
            imports: [RssModule],
        });
        app = instance.app;
        mongod = instance.mongod;
        mongooseConnection = instance.mongooseConnection;
    });

    test('get blog rss success', async () => {
        return request(app.getHttpServer())
            .get('/blog/rss')
            .expect('Content-Type', 'text/xml; charset=utf-8')
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
        await mongooseConnection.dropDatabase();
        await mongooseConnection.close();
        await mongod.stop();
    });
});

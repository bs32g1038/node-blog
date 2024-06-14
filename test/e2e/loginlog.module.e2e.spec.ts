import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../util';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection } from 'mongoose';
import { LoginLogModule } from '@blog/server/modules/loginlog/loginlog.module';

/**
 * adminlog模块 api 测试
 */
describe('adminlog.module.e2e', () => {
    let app: INestApplication;
    let mongod: MongoMemoryServer;
    let mongooseConnection: Connection;
    let getToken: () => string[];

    beforeAll(async () => {
        const instance = await initApp({
            imports: [LoginLogModule],
        });
        app = instance.app;
        mongod = instance.mongod;
        mongooseConnection = instance.mongooseConnection;
        getToken = instance.getToken;
    });

    test('get admin logs success', async () => {
        return request(app.getHttpServer()).get('/api/admin-logs').set('Cookie', getToken()).expect(200);
    });

    test('get recent admin logs success', async () => {
        return request(app.getHttpServer()).get('/api/recent-admin-logs').set('Cookie', getToken()).expect(200);
    });

    afterAll(async () => {
        await app.close();
        await mongooseConnection.close();
        await mongod.stop();
    });
});

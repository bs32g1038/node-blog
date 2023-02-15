import request from 'supertest';
import { AdminLogModule } from '@blog/server/modules/adminlog/adminlog.module';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../util';
import { getToken } from '../util';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection } from 'mongoose';
const __TOKEN__ = getToken();

/**
 * adminlog模块 api 测试
 */
describe('adminlog.module.e2e', () => {
    let app: INestApplication;
    let mongod: MongoMemoryServer;
    let mongooseConnection: Connection;

    beforeAll(async () => {
        const instance = await initApp({
            imports: [AdminLogModule],
        });
        app = instance.app;
        mongod = instance.mongod;
        mongooseConnection = instance.mongooseConnection;
    });

    test('get admin logs success', async () => {
        return request(app.getHttpServer()).get('/api/admin-logs').set('authorization', __TOKEN__).expect(200);
    });

    test('get recent admin logs success', async () => {
        return request(app.getHttpServer()).get('/api/recent-admin-logs').set('authorization', __TOKEN__).expect(200);
    });

    afterAll(async () => {
        await app.close();
        await mongooseConnection.dropDatabase();
        await mongooseConnection.close();
        await mongod.stop();
    });
});

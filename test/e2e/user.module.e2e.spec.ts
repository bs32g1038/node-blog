import request from 'supertest';
import { UserModule } from '@blog/server/modules/user/user.module';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../util';
import { encrypt } from '@blog/server/utils/crypto.util';
import { getToken } from '../util';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection } from 'mongoose';
const __TOKEN__ = getToken();

/**
 * 用户模块 api 测试
 */
describe('user.module.e2e', () => {
    let app: INestApplication;
    let mongod: MongoMemoryServer;
    let mongooseConnection: Connection;

    beforeAll(async () => {
        const instance = await initApp({
            imports: [UserModule],
        });
        app = instance.app;
        mongod = instance.mongod;
        mongooseConnection = instance.mongooseConnection;
    });

    test('get user login info success', async () => {
        return request(app.getHttpServer()).get('/api/user/login-info').set('authorization', __TOKEN__).expect(200);
    });

    test('forbidden request, get user login info failure', async () => {
        return request(app.getHttpServer()).get('/api/user/login-info').expect(403);
    });

    test('update user info success', async () => {
        return request(app.getHttpServer())
            .put('/api/user/update')
            .set('authorization', __TOKEN__)
            .send({
                avatar: 'http://127.0.0.1/test.jpg',
                userName: 'test',
                email: 'test@test.com',
            })
            .expect(200);
    });

    test('forbidden request, update user info failure', async () => {
        return request(app.getHttpServer()).put('/api/user/update').expect(403);
    });

    test('reset-password success', async () => {
        return request(app.getHttpServer())
            .put('/api/user/reset-password')
            .set('authorization', __TOKEN__)
            .send({
                key: encrypt(
                    JSON.stringify({
                        password: 'password',
                    })
                ),
            })
            .expect(200);
    });

    test('forbidden request, reset-password failure', async () => {
        return request(app.getHttpServer()).put('/api/user/reset-password').expect(403);
    });

    afterAll(async () => {
        await app.close();
        await mongooseConnection.dropDatabase();
        await mongooseConnection.close();
        await mongod.stop();
    });
});

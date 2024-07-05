import request from 'supertest';
import { UserModule } from '@blog/server/modules/user/user.module';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../util';
import { encrypt } from '@blog/server/utils/crypto.util';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection } from 'mongoose';
import { FileModule } from '@blog/server/modules/file/file.module';
import { faker } from '@faker-js/faker';

/**
 * 用户模块 api 测试
 */
describe('user.module.e2e', () => {
    let app: INestApplication;
    let mongod: MongoMemoryServer;
    let mongooseConnection: Connection;
    let getToken: () => string[];

    beforeAll(async () => {
        const instance = await initApp({
            imports: [UserModule, FileModule],
        });
        app = instance.app;
        mongod = instance.mongod;
        mongooseConnection = instance.mongooseConnection;
        getToken = instance.getToken;
    });

    test('get user login info success', async () => {
        return request(app.getHttpServer()).get('/api/user/login-info').set('Cookie', getToken()).expect(200);
    });

    test('forbidden request, get user login info failure', async () => {
        return request(app.getHttpServer()).get('/api/user/login-info').expect(401);
    });

    describe('user registration captcha code', () => {
        test('incorrect captcha code', async () => {
            return request(app.getHttpServer())
                .post('/api/user/auth/signup')
                .send({
                    email: faker.internet.email(),
                    password: encrypt('test1'),
                })
                .expect(400);
        });
        test('correct captcha code', async () => {
            const resultCaptcha = await request(app.getHttpServer()).get('/api/files/captcha');
            const res = await request(app.getHttpServer())
                .get('/api/test/session')
                .set('Cookie', resultCaptcha.header['set-cookie']);
            await request(app.getHttpServer())
                .post('/api/user/auth/email')
                .set('Cookie', resultCaptcha.header['set-cookie'])
                .send({
                    email: faker.internet.email(),
                    captcha: res.body.captcha,
                });
            const res1 = await request(app.getHttpServer())
                .get('/api/test/session')
                .set('Cookie', resultCaptcha.header['set-cookie']);
            await request(app.getHttpServer())
                .post('/api/user/auth/signup')
                .set('Cookie', resultCaptcha.header['set-cookie'])
                .send({
                    email: faker.internet.email(),
                    password: encrypt('test1'),
                    emailCode: res1.body.emailCode,
                })
                .expect(201);
        });
    });

    test('update user info success', async () => {
        return request(app.getHttpServer())
            .put('/api/user/update')
            .set('Cookie', getToken())
            .send({
                avatar: 'http://127.0.0.1/test.jpg',
                username: 'test',
                email: 'test@test.com',
            })
            .expect(200);
    });

    test('forbidden request, update user info failure', async () => {
        return request(app.getHttpServer()).put('/api/user/update').expect(401);
    });

    test('reset-password success', async () => {
        return request(app.getHttpServer())
            .put('/api/user/reset-password')
            .set('Cookie', getToken())
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
        return request(app.getHttpServer()).put('/api/user/reset-password').expect(401);
    });

    afterAll(async () => {
        await app.close();
        await mongooseConnection.close();
        await mongod.stop();
    });
});

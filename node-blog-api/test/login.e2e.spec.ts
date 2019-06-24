import * as request from 'supertest';
import { LoginModule } from '../src/modules/login.module';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { encrypt } from '../src/utils/crypto.util';
import config from '../src/configs/index.config';
import { MongooseModule } from '@nestjs/mongoose';
import { verifyToken } from './util';

describe('LoginController', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot(config.test_db.uri, { useNewUrlParser: true }),
                LoginModule
            ]
        }).compile();

        app = module.createNestApplication();
        await app.init();
    });

    it('/GET /api/getFirstLoginInfo 200', async () => {
        return request(app.getHttpServer())
            .get('/api/getFirstLoginInfo')
            .expect(200)
            .expect({ msg: '你是首次登陆，该账号将为你的管理员账号，请务必记住！直接登陆即可生成账号！' });
    });

    it('/POST /api/login 200 first test error account', async () => {
        return request(app.getHttpServer())
            .post('/api/login')
            .send({
                key: encrypt(JSON.stringify({
                    account: '',
                    password: 'test'
                }))
            })
            .then(res => {
                expect(typeof res.body.msg).toBe('string');
            });
    });

    it('/POST /api/login 200 first test error password', async () => {
        return request(app.getHttpServer())
            .post('/api/login')
            .send({
                key: encrypt(JSON.stringify({
                    account: 'test',
                    password: ''
                }))
            })
            .then(res => {
                expect(typeof res.body.msg).toBe('string');
            });
    });

    it('/POST /api/login 200', async () => {
        return request(app.getHttpServer())
            .post('/api/login')
            .send({
                key: encrypt(JSON.stringify({
                    account: 'test',
                    password: 'test'
                }))
            })
            .then(res => {
                expect(!verifyToken(res.body.token)).toBe(false);
            });
    });

    it('/POST /api/login 200 test account or password error', async () => {
        return request(app.getHttpServer())
            .post('/api/login')
            .send({
                key: encrypt(JSON.stringify({
                    account: 'test',
                    password: ''
                }))
            })
            .then(res => {
                expect(res.body).toEqual({
                    msg: '用户名或者密码输入有误，请重新检查后再登陆！'
                });
            });
    });

    it('/GET /api/getFirstLoginInfo 200', async () => {
        return request(app.getHttpServer())
            .get('/api/getFirstLoginInfo')
            .expect(200)
            .expect('');
    });

    afterAll(async () => {
        await app.close();
    });
});

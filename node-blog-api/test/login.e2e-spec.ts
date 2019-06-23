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

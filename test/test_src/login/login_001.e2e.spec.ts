import request from 'supertest';
import { LoginModule } from '../../../server/modules/login.module';
import { INestApplication } from '@nestjs/common';
import { encrypt } from '../../../server/utils/crypto.util';
import { verifyToken } from '../../util';
import { initApp } from '../../util';

describe('login_001', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [LoginModule],
        });
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
                key: encrypt(
                    JSON.stringify({
                        account: '',
                        password: 'test',
                    })
                ),
            })
            .then(res => {
                expect(typeof res.body.msg).toBe('string');
            });
    });

    it('/POST /api/login 200 first test error password', async () => {
        return request(app.getHttpServer())
            .post('/api/login')
            .send({
                key: encrypt(
                    JSON.stringify({
                        account: 'test',
                        password: '',
                    })
                ),
            })
            .then(res => {
                expect(typeof res.body.msg).toBe('string');
            });
    });

    it('/POST /api/login 200 first login', async () => {
        return request(app.getHttpServer())
            .post('/api/login')
            .send({
                key: encrypt(
                    JSON.stringify({
                        account: 'test',
                        password: 'test',
                    })
                ),
            })
            .then(res => {
                expect(!verifyToken(res.body.token)).toBe(false);
            });
    });

    it('/POST /api/login 200 second login', async () => {
        return request(app.getHttpServer())
            .post('/api/login')
            .send({
                key: encrypt(
                    JSON.stringify({
                        account: 'test',
                        password: 'test',
                    })
                ),
            })
            .then(res => {
                expect(!verifyToken(res.body.token)).toBe(false);
            });
    });

    it('/POST /api/login 400 test account or password error', async () => {
        return request(app.getHttpServer())
            .post('/api/login')
            .send({
                key: encrypt(
                    JSON.stringify({
                        account: 'test',
                        password: '',
                    })
                ),
            })
            .expect(400);
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

import request from 'supertest';
import { LoginModule } from '@blog/server/modules/login/login.module';
import { INestApplication } from '@nestjs/common';
import { encrypt } from '@blog/server/utils/crypto.util';
import { verifyToken, closeApp } from '../util';
import { initApp } from '../util';

/**
 * 登录模块 api 测试
 */
describe('login.module.e2e', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [LoginModule],
        });
    });

    test('first login tip info', async () => {
        return request(app.getHttpServer())
            .get('/api/getFirstLoginInfo')
            .expect(200)
            .expect({ message: '你是首次登陆，该账号将为你的管理员账号，请务必记住！直接登陆即可生成账号！' });
    });

    test('bad request, first login, try use empty account', async () => {
        return request(app.getHttpServer())
            .post('/api/login')
            .send({ key: encrypt(JSON.stringify({ userName: 'test', account: '', password: 'admin_password' })) })
            .expect(400)
            .then(res => {
                expect(res.body.statusCode).toEqual(400);
                expect(res.body.message).toEqual(
                    '你是首次登陆，该账号将为你的管理员账号，请务必记住！账号长度在6-30之间！'
                );
            });
    });

    test('bad request, first login, try use empty password', async () => {
        return request(app.getHttpServer())
            .post('/api/login')
            .send({ key: encrypt(JSON.stringify({ userName: 'test', account: 'admin_account', password: '' })) })
            .expect(400)
            .then(res => {
                expect(res.body.statusCode).toEqual(400);
                expect(res.body.message).toEqual(
                    '你是首次登陆，该账号将为你的管理员账号，请务必记住！密码长度在6-30之间！'
                );
            });
    });

    test('first login success', async () => {
        return request(app.getHttpServer())
            .post('/api/login')
            .send({
                key: encrypt(
                    JSON.stringify({ userName: 'test', account: 'admin_account', password: 'admin_password' })
                ),
            })
            .expect(201)
            .then(res => {
                expect(!verifyToken(res.body.token)).toBe(false);
            })
            .catch(err => {
                console.log(err);
            });
    });

    test('second login also should be success', async () => {
        return request(app.getHttpServer())
            .post('/api/login')
            .send({ key: encrypt(JSON.stringify({ account: 'admin_account', password: 'admin_password' })) })
            .expect(201)
            .then(res => {
                expect(!verifyToken(res.body.token)).toBe(false);
            });
    });

    test('not first login, try account or password error, return warning message', async () => {
        return request(app.getHttpServer())
            .post('/api/login')
            .send({ key: encrypt(JSON.stringify({ account: 'admin_account1', password: 'admin_account1' })) })
            .expect(400)
            .then(res => {
                expect(res.body.statusCode).toEqual(400);
                expect(res.body.message).toEqual('用户名或者密码输入有误，请重新检查后再登陆！');
            });
    });

    test('once again request first login api interface, should not return any info', async () => {
        return request(app.getHttpServer())
            .get('/api/getFirstLoginInfo')
            .expect(200)
            .expect('');
    });

    test('user unauthorized, forbidden request', async () => {
        return request(app.getHttpServer())
            .get('/api/is-login')
            .expect(403);
    });

    test('user authorized, return true', async () => {
        return request(app.getHttpServer())
            .get('/api/is-login')
            .set('authorization', __TOKEN__)
            .expect(200)
            .expect({ isLogin: true });
    });

    afterAll(async () => {
        await closeApp(app);
    });
});

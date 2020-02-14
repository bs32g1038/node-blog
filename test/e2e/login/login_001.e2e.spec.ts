import request from 'supertest';
import { LoginModule } from '../../../server/modules/login.module';
import { INestApplication } from '@nestjs/common';
import { encrypt } from '../../../server/utils/crypto.util';
import { verifyToken } from '../../util';
import { initApp, formatJestItNameE2e, generateUrl } from '../../util';

/**
 * 登录 判断是否登录 api 测试
 */
const template = ({ url, status = 200, method, message = '', body = {} }) => {
    return formatJestItNameE2e({ method, url, status, message, body });
};

describe('login_001_e2e', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [LoginModule],
        });
    });

    it(template({ url: '/api/getFirstLoginInfo', method: 'get', status: 200 }), async () => {
        return request(app.getHttpServer())
            .get(generateUrl({ url: '/api/getFirstLoginInfo' }))
            .expect(200)
            .expect({ msg: '你是首次登陆，该账号将为你的管理员账号，请务必记住！直接登陆即可生成账号！' });
    });

    const url = '/api/login';
    it(
        template({
            url,
            method: 'post',
            status: 200,
            message: '第一次登录，测试错误账号格式',
            body: {
                key: encrypt(JSON.stringify({ account: '', password: 'test' })),
            },
        }),
        async () => {
            return request(app.getHttpServer())
                .post(url)
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
        }
    );

    it(
        template({
            url,
            method: 'post',
            status: 200,
            message: '第一次登录，测试错误密码格式',
            body: {
                key: encrypt(JSON.stringify({ account: 'test', password: '' })),
            },
        }),
        async () => {
            return request(app.getHttpServer())
                .post(url)
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
        }
    );

    it(
        template({
            url,
            method: 'post',
            status: 200,
            message: '第一次登录',
            body: {
                key: encrypt(JSON.stringify({ account: 'test', password: 'test' })),
            },
        }),
        async () => {
            return request(app.getHttpServer())
                .post(url)
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
        }
    );

    it(
        template({
            url,
            method: 'post',
            status: 200,
            message: '第二次登录',
            body: {
                key: encrypt(JSON.stringify({ account: 'test', password: 'test' })),
            },
        }),
        async () => {
            return request(app.getHttpServer())
                .post(url)
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
        }
    );

    it(
        template({
            url,
            method: 'post',
            status: 400,
            message: '账号或者密码错误',
            body: {
                key: encrypt(JSON.stringify({ account: 'test', password: '' })),
            },
        }),
        async () => {
            return request(app.getHttpServer())
                .post(url)
                .send({
                    key: encrypt(
                        JSON.stringify({
                            account: 'test',
                            password: '',
                        })
                    ),
                })
                .expect(400);
        }
    );

    it(
        template({
            url: '/api/getFirstLoginInfo',
            method: 'get',
            status: 200,
            message: '再次调用获取首次登录信息，正常返回空',
        }),
        async () => {
            return request(app.getHttpServer())
                .get('/api/getFirstLoginInfo')
                .expect(200)
                .expect('');
        }
    );

    afterAll(async () => {
        await app.close();
    });
});

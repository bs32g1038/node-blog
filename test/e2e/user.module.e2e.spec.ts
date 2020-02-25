import request from 'supertest';
import { UserModule } from '../../server/modules/user.module';
import { INestApplication } from '@nestjs/common';
import { initApp, closeApp } from '../util';

/**
 * 用户模块 api 测试
 */
describe('user.module.e2e', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [UserModule],
        });
    });

    test('get user login info success', async () => {
        return request(app.getHttpServer())
            .get('/api/user/login-info')
            .set('authorization', __TOKEN__)
            .expect(200);
    });

    afterAll(async () => {
        await closeApp(app);
    });
});

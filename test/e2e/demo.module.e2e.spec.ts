import request from 'supertest';
import { DemoModule } from '@blog/server/modules/demo/demo.module';
import { INestApplication } from '@nestjs/common';
import { initApp, closeApp } from '../util';

/**
 * demo模块 api 测试
 */
describe('demo.module.e2e', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [DemoModule],
        });
    });

    test('git clone demo success', async () => {
        return request(app.getHttpServer())
            .post('/api/demo/git')
            .set('authorization', __TOKEN__)
            .expect(201);
    });

    test('get demo list success', async () => {
        return request(app.getHttpServer())
            .get('/api/demos')
            .set('authorization', __TOKEN__)
            .expect(200);
    });

    afterAll(async () => {
        await closeApp(app);
    });
});

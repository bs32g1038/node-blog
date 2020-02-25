import request from 'supertest';
import { AdminLogModule } from '../../server/modules/adminlog.module';
import { INestApplication } from '@nestjs/common';
import { initApp, closeApp } from '../util';

/**
 * adminlog模块 api 测试
 */
describe('adminlog.module.e2e', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [AdminLogModule],
        });
    });

    test('get admin logs success', async () => {
        return request(app.getHttpServer())
            .get('/api/admin-logs')
            .set('authorization', __TOKEN__)
            .expect(200);
    });

    test('get recent admin logs success', async () => {
        return request(app.getHttpServer())
            .get('/api/recent-admin-logs')
            .set('authorization', __TOKEN__)
            .expect(200);
    });

    afterAll(async () => {
        await closeApp(app);
    });
});

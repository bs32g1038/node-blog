import request from 'supertest';
import { DashboardModule } from '@blog/server/modules/dashboard/dashboard.module';
import { INestApplication } from '@nestjs/common';
import { initApp, closeApp } from '../util';
import { getToken } from '../util';
const __TOKEN__ = getToken();

/**
 * dashboard模块 api 测试
 */
describe('dashboard.module.e2e', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({ imports: [DashboardModule] });
    });

    test('get dashboard statistical info success', async () => {
        return request(app.getHttpServer())
            .get('/api/dashboard/statistical-info')
            .set('authorization', __TOKEN__)
            .expect(200);
    });

    test('get dashboard system info success', async () => {
        return request(app.getHttpServer())
            .get('/api/dashboard/system-info')
            .set('authorization', __TOKEN__)
            .expect(200);
    });

    afterAll(async () => {
        await closeApp(app);
    });
});

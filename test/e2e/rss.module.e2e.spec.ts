import request from 'supertest';
import { RssModule } from '@blog/server/modules/rss/rss.module';
import { INestApplication } from '@nestjs/common';
import { initApp, closeApp } from '../util';

/**
 * rss模块 api 测试
 */
describe('rss.module.e2e', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [RssModule],
        });
    });

    test('get blog rss success', async () => {
        return request(app.getHttpServer())
            .get('/blog/rss')
            .expect('Content-Type', 'text/xml; charset=utf-8')
            .expect(200);
    });

    afterAll(async () => {
        await closeApp(app);
    });
});

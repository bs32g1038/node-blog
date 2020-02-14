import request from 'supertest';
import { RssModule } from '../../../server/modules/rss.module';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';

/**
 * rss 博客 rss api 测试
 */

describe('rss_001_e2e', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [RssModule],
        });
    });

    it('/GET /blog/rss 200', async () => {
        return request(app.getHttpServer())
            .get('/blog/rss')
            .expect('Content-Type', 'text/xml; charset=utf-8')
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});

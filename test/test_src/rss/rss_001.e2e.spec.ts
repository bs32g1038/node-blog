import * as request from 'supertest';
import { RssModule } from '../../../src/modules/rss.module';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';

describe('rss_001', () => {
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

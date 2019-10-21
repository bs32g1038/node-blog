import request from 'supertest';
import { SearchModule } from '../../../server/modules/search.module';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';

describe('search_001', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [SearchModule],
        });
    });

    it('/GET /api/search 200 no key', async () => {
        return request(app.getHttpServer())
            .get('/api/search')
            .expect(200)
            .then(res => {
                expect(Array.isArray(res.body.items)).toEqual(true);
                expect(res.body.totalCount).toBeGreaterThanOrEqual(0);
            });
    });

    it('/GET /api/search?key=? 200 key=null', async () => {
        return request(app.getHttpServer())
            .get('/api/search?key=')
            .expect(200)
            .then(res => {
                expect(Array.isArray(res.body.items)).toEqual(true);
                expect(res.body.totalCount).toBeGreaterThanOrEqual(0);
            });
    });

    it('/GET /api/search?key=? 200', async () => {
        return request(app.getHttpServer())
            .get('/api/search?key=test')
            .expect(200)
            .then(res => {
                expect(Array.isArray(res.body.items)).toEqual(true);
                expect(res.body.totalCount).toBeGreaterThanOrEqual(0);
            });
    });

    afterAll(async () => {
        await app.close();
    });
});

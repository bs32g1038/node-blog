import * as request from 'supertest';
import { SearchModule } from '../../../src/modules/search.module';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';

describe('search_001', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                DatabaseModule,
                SearchModule
            ]
        }).compile();
        app = module.createNestApplication();
        await app.init();
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

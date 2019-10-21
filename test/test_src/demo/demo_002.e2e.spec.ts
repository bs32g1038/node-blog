import * as request from 'supertest';
import { DemoModule } from '../../../src/modules/demo.module';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';

describe('demo_002', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [DemoModule],
        });
    });

    const time = new Date().toISOString();
    const demo = {
        _id: '5d0fa726dec2a442e1c66bd2',
        title: 'test',
        content: '```html\ntest\n```',
        visitCount: 1,
        createdAt: time,
        updatedAt: time,
        __v: 0,
    };

    it('/POST /api/demos 200', async () => {
        return request(app.getHttpServer())
            .post('/api/demos')
            .set('authorization', __TOKEN__)
            .send(demo)
            .expect(201);
    });

    it('/GET /demos/:id 200', async () => {
        return request(app.getHttpServer())
            .get('/demos/' + demo._id)
            .expect(200)
            .expect('Content-Type', 'text/html; charset=utf-8');
    });

    afterAll(async () => {
        await app.close();
    });
});

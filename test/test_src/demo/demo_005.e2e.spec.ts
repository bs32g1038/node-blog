import request from 'supertest';
import { DemoModule } from '../../../server/modules/demo.module';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';

describe('demo_005', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [DemoModule],
        });
    });

    const time = new Date().toISOString();
    const demo = {
        _id: '5d0fa725dec1a242e2c66bd2',
        title: 'test',
        content: '```zz\ntest\n```',
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

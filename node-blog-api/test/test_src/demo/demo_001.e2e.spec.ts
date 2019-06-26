import * as request from 'supertest';
import { DemoModule } from '../../../src/modules/demo.module';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';

describe('demo_001', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [
                DemoModule
            ]
        });
    });

    const time = new Date().toISOString();
    const demo = {
        _id: '5d0fa726dec2a442e4c66bd2',
        title: 'test',
        content: '```html\ntest\n```\n```css\ntest\n```\n```javascript\ntest\n```',
        visitCount: 1,
        createdAt: time,
        updatedAt: time,
        __v: 0
    };

    it('/POST /api/demos 403', async () => {
        return request(app.getHttpServer())
            .post('/api/demos')
            .send(demo)
            .expect(403);
    });

    it('/PUT /api/demos/:id 403', async () => {
        return request(app.getHttpServer())
            .put('/api/demos/' + demo._id)
            .send(demo)
            .expect(403);
    });

    it('/DELETE /api/demos/:id 403', async () => {
        return request(app.getHttpServer())
            .delete('/api/demos/' + demo._id)
            .expect(403);
    });

    it('/POST /api/demos 200', async () => {
        return request(app.getHttpServer())
            .post('/api/demos')
            .set('authorization', __TOKEN__)
            .send(demo)
            .expect(201)
            .then(res => {
                const a = res.body;
                expect(a._id).toEqual(demo._id);
                expect(a.title).toEqual(demo.title);
                expect(a.content).toEqual(demo.content);
                expect(a.visitCount).toEqual(demo.visitCount);
                expect(a.__v).toEqual(demo.__v);
            });
    });

    it('/GET /api/demos 200', async () => {
        return request(app.getHttpServer())
            .get('/api/demos')
            .expect(200)
            .then(res => {
                const arr = res.body.items.filter(item => {
                    return item._id === demo._id;
                });
                const a = arr[0];
                expect(a._id).toEqual(demo._id);
                expect(a.title).toEqual(demo.title);
                expect(a.content).toEqual(demo.content);
                expect(a.visitCount).toEqual(demo.visitCount);
                expect(a.__v).toEqual(demo.__v);
            });
    });

    it('/GET /api/demos/:id 200', async () => {
        return request(app.getHttpServer())
            .get('/api/demos/' + demo._id)
            .expect(200)
            .then(res => {
                const a = res.body;
                expect(a._id).toEqual(demo._id);
                expect(a.title).toEqual(demo.title);
                expect(a.content).toEqual(demo.content);
                expect(a.visitCount).toEqual(demo.visitCount);
                expect(a.__v).toEqual(demo.__v);
            });
    });

    it('/GET /demos/:id 200', async () => {
        return request(app.getHttpServer())
            .get('/demos/' + demo._id)
            .expect(200)
            .expect('Content-Type', 'text/html; charset=utf-8');
    });

    it('/PUT /api/demos 200', async () => {
        return request(app.getHttpServer())
            .put('/api/demos/' + demo._id)
            .set('authorization', __TOKEN__)
            .send(demo)
            .expect(200)
            .then(res => {
                const a = res.body;
                expect(a._id).toEqual(demo._id);
                expect(a.title).toEqual(demo.title);
                expect(a.content).toEqual(demo.content);
                expect(a.visitCount).toEqual(demo.visitCount);
                expect(new Date(a.updatedAt).getTime()).toBeGreaterThanOrEqual(new Date(demo.updatedAt).getTime());
                expect(a.__v).toEqual(demo.__v);
            });
    });

    it('/DELETE /api/demos/:id 200', async () => {
        return request(app.getHttpServer())
            .delete('/api/demos/' + demo._id)
            .set('authorization', __TOKEN__)
            .expect(200)
            .expect({});
    });

    afterAll(async () => {
        await app.close();
    });
});

import * as request from 'supertest';
import { CategoryModule } from '../../../src/modules/category.module';
import { LoginModule } from '../../../src/modules/login.module';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';

describe('CategoryController', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                DatabaseModule,
                CategoryModule,
                LoginModule
            ]
        }).compile();
        app = module.createNestApplication();
        await app.init();
    });

    const time = new Date().toISOString();
    const category = {
        _id: '5c0f3e2b25349c1270e7a4ec',
        articleCount: 10,
        order: 0,
        name: 'test',
        createdAt: time,
        updatedAt: time,
        __v: 0
    };

    it('/POST /api/categories 403', async () => {
        return request(app.getHttpServer())
            .post('/api/categories')
            .send(category)
            .expect(403);
    });

    it('/PUT /api/categories/:id 403', async () => {
        return request(app.getHttpServer())
            .put('/api/categories/' + category._id)
            .send(category)
            .expect(403);
    });

    it('/DELETE /api/categories/:id 403', async () => {
        return request(app.getHttpServer())
            .delete('/api/categories/' + category._id)
            .expect(403);
    });

    it('/POST /api/categories 200', async () => {
        return request(app.getHttpServer())
            .post('/api/categories')
            .set('authorization', __TOKEN__)
            .send(category)
            .expect(201)
            .expect(category);
    });

    it('/GET /api/categories 200', async () => {
        return request(app.getHttpServer())
            .get('/api/categories')
            .expect(200)
            .then(res => {
                const a = res.body[0];
                expect(a._id).toEqual(category._id);
                expect(a.articleCount).toEqual(category.articleCount);
                expect(a.order).toEqual(category.order);
                expect(a.name).toEqual(category.name);
                expect(a.createdAt).toEqual(category.createdAt);
                expect(a.updatedAt).toEqual(category.updatedAt);
                expect(a.__v).toEqual(category.__v);
            });
    });

    it('/GET /api/categories?page=1&limit=20 200', async () => {
        return request(app.getHttpServer())
            .get('/api/categories')
            .expect(200)
            .then(res => {
                const a = res.body[0];
                expect(a._id).toEqual(category._id);
                expect(a.articleCount).toEqual(category.articleCount);
                expect(a.order).toEqual(category.order);
                expect(a.name).toEqual(category.name);
                expect(a.createdAt).toEqual(category.createdAt);
                expect(a.updatedAt).toEqual(category.updatedAt);
                expect(a.__v).toEqual(category.__v);
            });
    });

    it('/GET /api/categories/:id 200', async () => {
        return request(app.getHttpServer())
            .get('/api/categories/' + category._id)
            .expect(200)
            .then(res => {
                const a = res.body;
                expect(a._id).toEqual(category._id);
                expect(a.articleCount).toEqual(category.articleCount);
                expect(a.order).toEqual(category.order);
                expect(a.name).toEqual(category.name);
                expect(a.createdAt).toEqual(category.createdAt);
                expect(a.updatedAt).toEqual(category.updatedAt);
                expect(a.__v).toEqual(category.__v);
            });
    });

    it('/PUT /api/categories/:id 200', async () => {
        return request(app.getHttpServer())
            .put('/api/categories/' + category._id)
            .set('authorization', __TOKEN__)
            .send(category)
            .expect(200)
            .then(res => {
                const a = res.body;
                expect(a._id).toEqual(category._id);
                expect(a.articleCount).toEqual(category.articleCount);
                expect(a.order).toEqual(category.order);
                expect(a.name).toEqual(category.name);
                expect(a.createdAt).toEqual(category.createdAt);
                expect(new Date(a.updatedAt).getTime()).toBeGreaterThanOrEqual(new Date(category.updatedAt).getTime());
                expect(a.__v).toEqual(category.__v);
            });
    });

    it('/PUT /api/categories/:id 200', async () => {
        return request(app.getHttpServer())
            .put('/api/categories/5c0f3e2b25349c1270e7a4ac')
            .set('authorization', __TOKEN__)
            .send({ ...category, _id: '5c0f3e2b25349c1270e7a4ac' })
            .expect(200);
    });

    it('/DELETE /api/categories/:id 200', async () => {
        return request(app.getHttpServer())
            .delete('/api/categories/' + category._id)
            .set('authorization', __TOKEN__)
            .expect(200)
            .expect({});
    });

    afterAll(async () => {
        await app.close();
    });
});

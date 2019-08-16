import * as request from 'supertest';
import { CategoryModule } from '../../../src/modules/category.module';
import { LoginModule } from '../../../src/modules/login.module';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';
import * as mongoose from 'mongoose';

describe('category_002', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [CategoryModule, LoginModule],
        });
    });

    const time = new Date().toISOString();
    const category = {
        _id: '5c0f3e2b25349c1270e7a4ec',
        articleCount: 10,
        order: 0,
        name: 'test',
        createdAt: time,
        updatedAt: time,
        __v: 0,
    };

    it('/POST /api/categories 201', async () => {
        return request(app.getHttpServer())
            .post('/api/categories')
            .set('authorization', __TOKEN__)
            .send(category)
            .expect(201)
            .expect(category);
    });

    it('/DELETE /api/categories 400', async () => {
        return request(app.getHttpServer())
            .delete('/api/categories')
            .set('authorization', __TOKEN__)
            .send({
                categoryIds: '',
            })
            .expect(400);
    });

    it('/DELETE /api/categories 400 []', async () => {
        return request(app.getHttpServer())
            .delete('/api/categories')
            .set('authorization', __TOKEN__)
            .send({
                categoryIds: [],
            })
            .expect(400);
    });

    it('/DELETE /api/categories 200 [mongoose.Types.ObjectId()]', async () => {
        return request(app.getHttpServer())
            .delete('/api/categories')
            .set('authorization', __TOKEN__)
            .send({
                categoryIds: [mongoose.Types.ObjectId()],
            })
            .expect(200);
    });

    it('/DELETE /api/categories 200 [...]', async () => {
        return request(app.getHttpServer())
            .delete('/api/categories')
            .set('authorization', __TOKEN__)
            .send({
                categoryIds: [category._id],
            })
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});

import * as request from 'supertest';
import { CategoryModelProvider } from '../../../src/models/category.model';
import { ArticleModule } from '../../../src/modules/article.module';
import { CategoryService } from '../../../src/modules/category/category.service';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';
import * as mongoose from 'mongoose';

describe('article_007', () => {
    let app: INestApplication;
    const categoryId = mongoose.Types.ObjectId();
    const time = new Date().toISOString();

    beforeAll(async () => {
        app = await initApp({
            imports: [ArticleModule],
            providers: [CategoryModelProvider, CategoryService],
        });
        const categoryService = app.get<CategoryService>(CategoryService);
        const category = {
            _id: categoryId,
            articleCount: 10,
            order: 0,
            name: 'test',
            createdAt: time,
            updatedAt: time,
            __v: 0,
        };
        categoryService.create(category);
    });

    const article = {
        _id: mongoose.Types.ObjectId(),
        title: '原生 js 模拟实现 es6 中的 Promise',
        category: '5d67597dc8459c575823725c',
        tags: ['tstetet'],
        screenshot: '/static/upload/2019/628eed36b4d05397b0c30967011185c5.jpg',
        summary: 'testst',
        content: 'test',
    };

    it('/POST /api/articles 201', async () => {
        return request(app.getHttpServer())
            .post('/api/articles')
            .set('authorization', __TOKEN__)
            .send(article)
            .expect(201);
    });

    it('/GET /api/articles?tag=? 200', async () => {
        return request(app.getHttpServer())
            .get('/api/articles?tag=test')
            .expect(200)
            .then(res => {
                expect(res.body.totalCount).toBeGreaterThanOrEqual(0);
            });
    });

    afterAll(async () => {
        await app.close();
    });
});

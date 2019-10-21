import * as request from 'supertest';
import { CategoryModelProvider } from '../../../src/models/category.model';
import { ArticleModule } from '../../../src/modules/article.module';
import { CategoryService } from '../../../src/modules/category/category.service';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';
import * as mongoose from 'mongoose';

describe('article_002', () => {
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
        title: 'test',
        category: categoryId,
        tags: ['test'],
        screenshot: '/static/upload/2019/628eed36b4d05397b0c30967011185c5.jpg',
        summary: 'test',
        content: 'test',
    };

    it('/POST /api/articles 403', async () => {
        return request(app.getHttpServer())
            .post('/api/articles')
            .send(article)
            .expect(403);
    });

    afterAll(async () => {
        await app.close();
    });
});

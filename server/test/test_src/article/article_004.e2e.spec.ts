import * as request from 'supertest';
import { ArticleModule } from '../../../src/modules/article.module';
import { CategoryModule } from '../../../src/modules/category.module';
import { INestApplication } from '@nestjs/common';
import { CategoryService } from '../../../src/modules/category/category.service';
import * as mongoose from 'mongoose';
import { initApp } from '../../util';

describe('article_004', () => {
    let app: INestApplication;
    const categoryId = mongoose.Types.ObjectId();
    const time = new Date().toISOString();

    beforeAll(async () => {
        app = await initApp({
            imports: [ArticleModule, CategoryModule],
        });
        const categoryService = app.get<CategoryService>(CategoryService);
        await categoryService.create({
            _id: categoryId,
            articleCount: 10,
            order: 0,
            name: 'test',
            createdAt: time,
            updatedAt: time,
        });
    });

    const article = {
        _id: mongoose.Types.ObjectId(),
        isDraft: false,
        commentCount: 1,
        viewsCount: 1,
        isDeleted: false,
        title: 'test',
        content: '```html```\ntest\n```',
        summary: 'test',
        screenshot: 'http://www.lizc.me/static/upload/2019/027c4f5561d385b0b0a5338706694570.jpg',
        category: categoryId,
        createdAt: time,
        updatedAt: time,
        __v: 0,
    };

    it('/POST /api/articles 200', async () => {
        return request(app.getHttpServer())
            .post('/api/articles')
            .set('authorization', __TOKEN__)
            .send(article)
            .expect(201);
    });

    it('/PUT /api/articles/:id 200', async () => {
        return request(app.getHttpServer())
            .put('/api/articles/' + article._id)
            .set('authorization', __TOKEN__)
            .send(article)
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});

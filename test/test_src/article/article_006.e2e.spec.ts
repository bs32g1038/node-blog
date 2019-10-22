import request from 'supertest';
import { CategoryModelProvider } from '../../../server/models/category.model';
import { ArticleModule } from '../../../server/modules/article.module';
import { CategoryService } from '../../../server/modules/category/category.service';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';
import mongoose from 'mongoose';

describe('article_006', () => {
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
        isDraft: false,
        commentCount: 1,
        viewsCount: 1,
        isDeleted: false,
        title: 'test',
        content: '```html```\ntest\n```',
        category: categoryId,
        summary: 'test',
        screenshot: 'http://www.lizc.net/static/upload/2019/027c4f5561d385b0b0a5338706694570.jpg',
        createdAt: time,
        updatedAt: time,
        __v: 0,
    };

    it('/DELETE /api/articles 400', async () => {
        return request(app.getHttpServer())
            .delete('/api/articles')
            .set('authorization', __TOKEN__)
            .send({
                articleIds: '',
            })
            .expect(400);
    });

    it('/DELETE /api/articles 200 []', async () => {
        return request(app.getHttpServer())
            .delete('/api/articles')
            .set('authorization', __TOKEN__)
            .send({
                articleIds: [],
            })
            .expect(200);
    });

    it('/DELETE /api/articles 200 [mongoose.Types.ObjectId()]', async () => {
        return request(app.getHttpServer())
            .delete('/api/articles')
            .set('authorization', __TOKEN__)
            .send({
                articleIds: [mongoose.Types.ObjectId()],
            })
            .expect(200);
    });

    it('/DELETE /api/articles 200 [...]', async () => {
        return request(app.getHttpServer())
            .delete('/api/articles')
            .set('authorization', __TOKEN__)
            .send({
                articleIds: [article._id],
            })
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});

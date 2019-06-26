import * as request from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from '../../../src/models/category.model';
import { ArticleModule } from '../../../src/modules/article.module';
import { CategoryService } from '../../../src/modules/category/category.service';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';
import * as mongoose from 'mongoose';

describe('article_006', () => {
    let app: INestApplication;
    const category_id = mongoose.Types.ObjectId();
    beforeAll(async () => {
        app = await initApp({
            imports: [
                ArticleModule,
                MongooseModule.forFeature([
                    { name: 'category', schema: CategorySchema, collection: 'category' }
                ])
            ],
            providers: [CategoryService]
        });
        const categoryService = app.get<CategoryService>(CategoryService);
        const category = {
            _id: category_id,
            articleCount: 10,
            order: 0,
            name: 'test',
            createdAt: time,
            updatedAt: time,
            __v: 0
        };
        categoryService.create(category);
    });

    const time = new Date().toISOString();
    const article = {
        _id: mongoose.Types.ObjectId(),
        isDraft: false,
        commentCount: 1,
        viewsCount: 1,
        isDeleted: false,
        title: 'test',
        content: '```html```\ntest\n```',
        category: category_id,
        summary: 'test',
        screenshot: 'http://www.lizc.me/static/upload/2019/027c4f5561d385b0b0a5338706694570.jpg',
        createdAt: time,
        updatedAt: time,
        __v: 0
    };

    it('/POST /api/articles 201', async () => {
        return request(app.getHttpServer())
            .post('/api/articles')
            .set('authorization', __TOKEN__)
            .send(article)
            .expect(201);
    });

    afterAll(async () => {
        await app.close();
    });
});

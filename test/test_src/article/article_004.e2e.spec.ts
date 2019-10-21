import  request from 'supertest';
import { ArticleModule } from '../../../server/modules/article.module';
import { INestApplication } from '@nestjs/common';
import  mongoose from 'mongoose';
import { initApp } from '../../util';

describe('article_004', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({ imports: [ArticleModule] });
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
        category: mongoose.Types.ObjectId(),
        summary: 'test',
        screenshot: 'http://www.lizc.net/static/upload/2019/027c4f5561d385b0b0a5338706694570.jpg',
        createdAt: time,
        updatedAt: time,
        __v: 0,
    };

    it('/POST /api/articles 201', async () => {
        return request(app.getHttpServer())
            .post('/api/articles')
            .set('authorization', __TOKEN__)
            .send(article)
            .expect(201);
    });

    it('/PUT /api/articles/:id 400', async () => {
        return request(app.getHttpServer())
            .put('/api/articles/' + mongoose.Types.ObjectId())
            .set('authorization', __TOKEN__)
            .send(article)
            .expect(400);
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

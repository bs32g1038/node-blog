import * as request from 'supertest';
import { ArticleModule } from '../../../src/modules/article.module';
import { INestApplication } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { initApp } from '../../util';

describe('article_003', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({ imports: [ArticleModule] });
    });

    const time = new Date().toISOString();
    const _id = mongoose.Types.ObjectId();
    const article = {
        _id,
        isDraft: false,
        commentCount: 1,
        viewsCount: 1,
        isDeleted: false,
        title: 'test',
        content: '```html```\ntest\n```',
        summary: 'test',
        screenshot: 'http://www.lizc.net/static/upload/2019/027c4f5561d385b0b0a5338706694570.jpg',
        category: mongoose.Types.ObjectId(),
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

    it('/DELETE /api/articles/:id 200', async () => {
        return request(app.getHttpServer())
            .delete('/api/articles/' + _id)
            .set('authorization', __TOKEN__)
            .expect(200)
            .expect({});
    });

    afterAll(async () => {
        await app.close();
    });
});

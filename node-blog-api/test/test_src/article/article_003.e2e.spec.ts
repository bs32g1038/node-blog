import * as request from 'supertest';
import { ArticleModule } from '../../../src/modules/article.module';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import * as mongoose from 'mongoose';

describe('article_003', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                DatabaseModule,
                ArticleModule
            ]
        }).compile();
        app = module.createNestApplication();
        await app.init();
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
        screenshot: 'http://www.lizc.me/static/upload/2019/027c4f5561d385b0b0a5338706694570.jpg',
        category: null,
        createdAt: time,
        updatedAt: time,
        __v: 0
    };

    it('/POST /api/articles 200', async () => {
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

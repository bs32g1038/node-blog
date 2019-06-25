import * as request from 'supertest';
import { ArticleModule } from '../../../src/modules/article.module';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';

describe('article_002', () => {
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
    const article = {
        _id: '5c0a1117244b3c01b464a3ec',
        isDraft: false,
        commentCount: 1,
        viewsCount: 1,
        isDeleted: false,
        title: 'test',
        content: '```html```\ntest\n```',
        summary: 'test',
        screenshot: 'http://www.lizc.me/static/upload/2019/027c4f5561d385b0b0a5338706694570.jpg',
        category: '5c0a1317244b3c01b464a3ec',
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

    it('/GET /api/articles/:id?md=true 200', async () => {
        return request(app.getHttpServer())
            .get('/api/articles/' + article._id + '?md=true')
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});

import request from 'supertest';
import { ArticleModule } from '../../../server/modules/article.module';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';
import mongoose from 'mongoose';

describe('article_008', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({ imports: [ArticleModule] });
    });

    it('/GET /api/articles/:id 200 return null', async () => {
        return request(app.getHttpServer())
            .get(`/api/articles/${mongoose.Types.ObjectId()}`)
            .expect(200)
            .then(res => {
                const a = res.body;
                expect(a).toEqual({});
            });
    });

    afterAll(async () => {
        await app.close();
    });
});

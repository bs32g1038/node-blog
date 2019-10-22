import request from 'supertest';
import { CategoryModelProvider } from '../../../server/models/category.model';
import { ArticleModule } from '../../../server/modules/article.module';
import { CategoryService } from '../../../server/modules/category/category.service';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';

describe('article_0015', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [ArticleModule],
            providers: [CategoryModelProvider, CategoryService],
        });
    });

    it('/GET /api/articles/:id?md=false 200', async () => {
        return request(app.getHttpServer())
            .get(`/api/articles/5c0f3e2b25349c1270e432ec?md=false`)
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});

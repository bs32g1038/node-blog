import * as request from 'supertest';
import { CommentModule } from '../../../src/modules/comment.module';
import { ArticleModule } from '../../../src/modules/article.module';
import { LoginModule } from '../../../src/modules/login.module';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';

describe('comment_002', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [CommentModule, ArticleModule, LoginModule],
        });
    });

    it('/GET /api/comments?articleId=? 200', async () => {
        return request(app.getHttpServer())
            .get('/api/comments?articleId=5c0f3e2b25349c1270e734ec')
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});

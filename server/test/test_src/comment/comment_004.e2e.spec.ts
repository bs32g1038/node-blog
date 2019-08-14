import * as request from 'supertest';
import { CommentModule } from '../../../src/modules/comment.module';
import { ArticleModule } from '../../../src/modules/article.module';
import { LoginModule } from '../../../src/modules/login.module';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';

describe('comment_004', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [CommentModule, ArticleModule, LoginModule],
        });
    });

    it('/GET /api/recent-comments 403', async () => {
        return request(app.getHttpServer())
            .get('/api/recent-comments')
            .expect(403);
    });

    it('/GET /api/recent-comments 200', async () => {
        return request(app.getHttpServer())
            .get('/api/recent-comments')
            .set('authorization', __TOKEN__)
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});
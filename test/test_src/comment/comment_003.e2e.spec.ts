import * as request from 'supertest';
import { CommentModule } from '../../../src/modules/comment.module';
import { ArticleModule } from '../../../src/modules/article.module';
import { LoginModule } from '../../../src/modules/login.module';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';

describe('comment_003', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [CommentModule, ArticleModule, LoginModule],
        });
    });

    const comment = {
        pass: true,
        identity: 0,
        nickName: 'test',
        email: 'test@test.com',
        content: 'test',
        reply: '5c404fe4d7264e6bd09fbbfa',
        website: 'http://www.test.com',
        __v: 0,
    };

    it('/POST /api/comments 400', async () => {
        return request(app.getHttpServer())
            .post('/api/comments')
            .send(comment)
            .expect(400);
    });

    afterAll(async () => {
        await app.close();
    });
});

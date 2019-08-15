import * as request from 'supertest';
import { CommentModule } from '../../../src/modules/comment.module';
import { ArticleModule } from '../../../src/modules/article.module';
import { LoginModule } from '../../../src/modules/login.module';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';
import * as mongoose from 'mongoose';

describe('comment_005', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [CommentModule, ArticleModule, LoginModule],
        });
    });

    const comment = {
        _id: mongoose.Types.ObjectId(),
        pass: true,
        identity: 0,
        nickName: 'test',
        email: 'test@test.com',
        content: 'test',
        article: '5c0f3e2b25349c1270e734ec',
        reply: '5c404fe4d7264e6bd09fbbfa',
        website: 'http://www.test.com',
        __v: 0,
    };

    it('/POST /api/comments 201', async () => {
        return request(app.getHttpServer())
            .post('/api/comments')
            .set('authorization', __TOKEN__)
            .send(comment)
            .expect(201);
    });

    it('/DELETE /api/comments 200 []', async () => {
        return request(app.getHttpServer())
            .delete('/api/comments')
            .set('authorization', __TOKEN__)
            .expect(200);
    });

    it('/DELETE /api/comments 400 []', async () => {
        return request(app.getHttpServer())
            .delete('/api/comments')
            .set('authorization', __TOKEN__)
            .send({
                commentIds: [],
            })
            .expect(400);
    });

    it('/DELETE /api/comments 200', async () => {
        return request(app.getHttpServer())
            .get('/api/comments')
            .send({
                commentIds: [comment._id],
            })
            .set('authorization', __TOKEN__)
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});

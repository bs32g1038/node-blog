
import * as request from 'supertest';
import { CommentModule } from '../../../src/modules/comment.module';
import { ArticleModule } from '../../../src/modules/article.module';
import { LoginModule } from '../../../src/modules/login.module';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';

describe('CommentController', () => {
    let app: INestApplication;
    let module: TestingModule;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [
                DatabaseModule,
                CommentModule,
                ArticleModule,
                LoginModule
            ]
        }).compile();
        app = module.createNestApplication();
        await app.init();
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

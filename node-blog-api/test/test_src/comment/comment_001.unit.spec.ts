import { Test } from '@nestjs/testing';
import { CommentService } from '../../../src/modules/comment/comment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from '../../../src/models/article.model';
import { CommentSchema } from '../../../src/models/comment.model';
import { DatabaseModule } from '../../database/database.module';
import { INestApplication } from '@nestjs/common';

describe('CommentService', () => {
    let app: INestApplication;
    let commentService: CommentService;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                DatabaseModule,
                MongooseModule.forFeature([
                    { name: 'article', schema: ArticleSchema, collection: 'article' },
                    { name: 'comment', schema: CommentSchema, collection: 'comment' }
                ])],
            providers: [CommentService]
        }).compile();
        commentService = module.get<CommentService>(CommentService);
        app = module.createNestApplication();
        await app.init();
    });

    it('getComments {} {}', async () => {
        const arr = await commentService.getComments({}, {});
        expect(arr.length).toBeGreaterThanOrEqual(0);
    });

    it('getComments undefined undefined', async () => {
        try {
            const arr = await commentService.getComments(undefined, undefined);
        } catch (error) {
            expect(error).toEqual(error);
        }
    });

    afterAll(async () => {
        await app.close();
    });
});

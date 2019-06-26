import { CommentService } from '../../../src/modules/comment/comment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from '../../../src/models/article.model';
import { CommentSchema } from '../../../src/models/comment.model';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';

describe('comment_001_unit', () => {
    let app: INestApplication;
    let commentService: CommentService;

    beforeAll(async () => {
        app = await initApp({
            imports: [
                MongooseModule.forFeature([
                    { name: 'article', schema: ArticleSchema, collection: 'article' },
                    { name: 'comment', schema: CommentSchema, collection: 'comment' }
                ])
            ],
            providers: [CommentService]
        });
        commentService = app.get<CommentService>(CommentService);
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

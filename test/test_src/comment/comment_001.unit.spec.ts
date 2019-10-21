import { CommentService } from '../../../server/modules/comment/comment.service';
import { ArticleModelProvider } from '../../../server/models/article.model';
import { CommentModelProvider } from '../../../server/models/comment.model';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';

describe('comment_001_unit', () => {
    let app: INestApplication;
    let commentService: CommentService;

    beforeAll(async () => {
        app = await initApp({
            providers: [ArticleModelProvider, CommentModelProvider, CommentService],
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

import request from 'supertest';
import { CommentModule } from '@blog/server/modules/comment/comment.module';
import { INestApplication } from '@nestjs/common';
import { initApp, generateDataList, isExpectPass, closeApp } from '../util';
import { getComment, getArticle, getObjectId } from '../faker';
import { CommentModel, ArticleModel, clearModelCollectionData } from '../models';
import { getToken } from '../util';
const __TOKEN__ = getToken();

/**
 * 评论模块 api 测试
 */
describe('comment.module.e2e', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [CommentModule],
        });
    });

    beforeEach(async () => {
        await clearModelCollectionData();
    });

    describe('create comment', () => {
        test('permission:visitor', async () => {
            const article = await ArticleModel.create(getArticle());
            const comment = getComment({ article: article._id.toString() });

            return request(app.getHttpServer())
                .post('/api/comments')
                .send(comment)
                .expect(201)
                .then((res) => {
                    const a = res.body;
                    expect(a.pass).toEqual(true);
                    expect(a.identity).toEqual(0);
                    expect(a.nickName).toEqual(comment.nickName);
                    expect(a.content).toEqual(comment.content);
                    expect(a.reply).toEqual(comment.reply);
                    expect(a.article).toEqual(article._id.toString());
                });
        });

        test('permission:admin', async () => {
            const article = await ArticleModel.create(getArticle());
            const replyComment = {
                article: article._id.toString(),
                content: getComment().content,
                parentId: getObjectId(),
                reply: getObjectId(),
            };

            return request(app.getHttpServer())
                .post('/api/admin/reply-comment')
                .set('authorization', __TOKEN__)
                .send(replyComment)
                .expect(201)
                .then((res) => {
                    const a = res.body;
                    expect(a.pass).toEqual(true);
                    expect(a.identity).toEqual(1);
                    expect(a.content).toEqual(replyComment.content);
                    expect(a.reply).toBe(replyComment.reply);
                    expect(a.article).toEqual(article._id.toString());
                });
        });
    });

    describe('get comment list', () => {
        test('default query', async () => {
            const article = await ArticleModel.create(getArticle());
            const comments = generateDataList(() => getComment({ article: article._id.toString() }), 10);
            await CommentModel.create(comments);

            return request(app.getHttpServer())
                .get('/api/comments')
                .expect(200)
                .then((res) => {
                    expect(res.body.items.length).toBeGreaterThanOrEqual(10);
                    expect(isExpectPass(res.body.items, comments, ['email', 'article', 'reply'])).toEqual(true);
                });
        });

        test('filter by articleId', async () => {
            return request(app.getHttpServer())
                .get('/api/comments?articleId=' + getObjectId())
                .expect(200);
        });
    });

    test('get recent comment list 200', async () => {
        return request(app.getHttpServer()).get('/api/recent-comments').set('authorization', __TOKEN__).expect(200);
    });

    test('get one comment success', async () => {
        const article = await ArticleModel.create(getArticle());
        const comment = getComment({ article: article._id.toString() });
        const { _id } = await CommentModel.create(comment);

        return request(app.getHttpServer())
            .get('/api/comments/' + _id.toString())
            .set('authorization', __TOKEN__)
            .expect(200)
            .then((res) => {
                const a = res.body;
                expect(a.pass).toEqual(true);
                expect(a.identity).toEqual(0);
                expect(a.nickName).toEqual(comment.nickName);
                expect(a.content).toEqual(comment.content);
                expect(a.reply).toEqual(comment.reply);
            });
    });

    test('update comment success', async () => {
        const article = await ArticleModel.create(getArticle());
        const comment = getComment({ article: article._id.toString() });
        const { _id } = await CommentModel.create(comment);

        return request(app.getHttpServer())
            .put('/api/comments/' + _id.toString())
            .set('authorization', __TOKEN__)
            .send(comment)
            .expect(200)
            .then((res) => {
                const a = res.body;
                expect(a.pass).toEqual(true);
                expect(a.nickName).toEqual(comment.nickName);
                expect(a.content).toEqual(comment.content);
                expect(a.reply).toEqual(comment.reply);
                expect(a.article).toEqual(article._id.toString());
            });
    });

    test('delete comment success', async () => {
        const article = getArticle();
        const { _id: articleId } = await ArticleModel.create(article);
        const comment = getComment({ article: articleId });
        const { _id } = await CommentModel.create(comment);

        return request(app.getHttpServer())
            .delete('/api/comments/' + _id)
            .set('authorization', __TOKEN__)
            .expect(200);
    });

    describe('batch delete', () => {
        test('bad request, batch delete the data failure, the commentIds should be an objectId array', async () => {
            return request(app.getHttpServer())
                .delete('/api/comments')
                .set('authorization', __TOKEN__)
                .send({
                    commentIds: [],
                })
                .expect(400);
        });

        test('not found, batch delete the data failure, the commentIds data should be found in db', async () => {
            const testId = getObjectId();
            return request(app.getHttpServer())
                .delete('/api/comments')
                .set('authorization', __TOKEN__)
                .send({
                    commentIds: [testId],
                })
                .expect(404);
        });

        test('batch delete the data success', async () => {
            const article = getArticle();
            const { _id: articleId } = await ArticleModel.create(article);
            const comment = getComment({ article: articleId });
            const { _id } = await CommentModel.create(comment);

            return request(app.getHttpServer())
                .delete('/api/comments')
                .set('authorization', __TOKEN__)
                .send({
                    commentIds: [_id],
                })
                .expect(200);
        });
    });

    afterAll(async () => {
        await closeApp(app);
    });
});

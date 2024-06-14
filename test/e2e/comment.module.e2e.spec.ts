import request from 'supertest';
import { CommentModule } from '@blog/server/modules/comment/comment.module';
import { INestApplication } from '@nestjs/common';
import { initApp, generateDataList, isExpectPass } from '../util';
import { getComment, getArticle, getObjectId } from '../faker';
import { Article } from '@blog/server/models/article.model';
import { Model, Connection } from 'mongoose';
import { Comment } from '@blog/server/models/comment.model';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { User } from '@blog/server/models/user.model';

/**
 * 评论模块 api 测试
 */
describe('comment.module.e2e', () => {
    let app: INestApplication;
    let mongod: MongoMemoryServer;
    let mongooseConnection: Connection;
    let articleModel: Model<Article>;
    let commentModel: Model<Comment>;
    let getToken: () => string[];
    let user: User;

    beforeAll(async () => {
        const instance = await initApp({
            imports: [CommentModule],
        });
        app = instance.app;
        mongod = instance.mongod;
        mongooseConnection = instance.mongooseConnection;
        articleModel = instance.articleModel;
        commentModel = instance.commentModel;
        getToken = instance.getToken;
        user = instance.user;
    });

    beforeEach(async () => {
        await articleModel.deleteMany({});
        await commentModel.deleteMany({});
    });

    describe('create comment', () => {
        test('permission:user or admin', async () => {
            const article = await articleModel.create(getArticle());
            const comment = getComment({ article: article._id.toString() });
            return request(app.getHttpServer())
                .post('/api/comments')
                .set('Cookie', getToken())
                .send(comment)
                .expect(201)
                .then((res) => {
                    const a = res.body;
                    expect(a.pass).toEqual(true);
                    expect(a.content).toEqual(comment.content);
                    expect(a.reply).toEqual(comment.reply);
                    expect(a.article).toEqual(article._id.toString());
                });
        });
    });

    describe('get comment list', () => {
        test('default query', async () => {
            const article = await articleModel.create(getArticle());
            const comments = generateDataList(() => getComment({ article: article._id.toString() }), 10);
            await commentModel.create(comments);

            return request(app.getHttpServer())
                .get('/api/comments')
                .expect(200)
                .then((res) => {
                    expect(res.body.items.length).toBeGreaterThanOrEqual(10);
                });
        });

        test('filter by articleId', async () => {
            return request(app.getHttpServer())
                .get('/api/comments?articleId=' + getObjectId())
                .expect(200);
        });
    });

    test('get recent comment list 200', async () => {
        return request(app.getHttpServer()).get('/api/recent-comments').set('Cookie', getToken()).expect(200);
    });

    test('get one comment success', async () => {
        const article = await articleModel.create(getArticle());
        const comment = getComment({ article: article._id.toString() });
        const { _id } = await commentModel.create(comment);

        return request(app.getHttpServer())
            .get('/api/comments/' + _id.toString())
            .set('Cookie', getToken())
            .expect(200)
            .then((res) => {
                const a = res.body;
                expect(a.pass).toEqual(true);
                expect(a.content).toEqual(comment.content);
                expect(a.reply).toEqual(comment.reply);
            });
    });

    test('delete comment success', async () => {
        const article = getArticle();
        const { _id: articleId } = await articleModel.create(article);
        const comment = getComment({ article: articleId });
        const { _id } = await commentModel.create(comment);

        return request(app.getHttpServer())
            .delete('/api/comments/' + _id)
            .set('Cookie', getToken())
            .expect(200);
    });

    describe('batch delete', () => {
        test('bad request, batch delete the data failure, the ids should be an objectId array', async () => {
            return request(app.getHttpServer())
                .delete('/api/comments')
                .set('Cookie', getToken())
                .send({
                    ids: [],
                })
                .expect(400);
        });

        test('not found, batch delete the data failure, the ids data should be found in db', async () => {
            const testId = getObjectId();
            return request(app.getHttpServer())
                .delete('/api/comments')
                .set('Cookie', getToken())
                .send({
                    ids: [testId],
                })
                .expect(404);
        });

        test('batch delete the data success', async () => {
            const article = getArticle();
            const { _id: articleId } = await articleModel.create(article);
            const comment = getComment({ article: articleId });
            const { _id } = await commentModel.create(comment);

            return request(app.getHttpServer())
                .delete('/api/comments')
                .set('Cookie', getToken())
                .send({
                    ids: [_id],
                })
                .expect(200);
        });
    });

    afterAll(async () => {
        await app.close();
        await mongooseConnection.close();
        await mongod.stop();
    });
});

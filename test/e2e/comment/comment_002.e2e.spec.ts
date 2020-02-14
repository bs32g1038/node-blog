import request from 'supertest';
import { CommentModule } from '../../../server/modules/comment.module';
import { INestApplication } from '@nestjs/common';
import { initApp, generateUrl, formatJestItNameE2e, isExpectPass } from '../../util';
import { CommentModel, Comment } from '../../models';
import { getComment, getArticle } from '../../faker';

/**
 * 评论 获取多个条目 api 测试
 */
const TEST = {
    url: '/api/comments',
    method: 'get',
};

const getURL = (query = {}) => {
    return generateUrl({ url: TEST.url, query });
};

const template = ({ url = TEST.url, status = 200, params = {}, message = '', body = {} }) => {
    return formatJestItNameE2e({ url, method: TEST.method, status, params, message, body });
};

describe('comment_002', () => {
    let app: INestApplication;
    const article = getArticle();
    const fakerComments = [getComment(), getComment(), getComment()];

    const comments: Comment[] = [];
    for (let i = 0; i < 50; i++) {
        comments.push(
            getComment({
                article: article._id,
                reply: fakerComments[Math.floor(Math.random() * fakerComments.length)]._id,
            })
        );
    }

    beforeAll(async () => {
        app = await initApp({
            imports: [CommentModule],
        });
        CommentModel.create(comments);
    });

    it(template({ status: 200, params: { page: 1, limit: 20 } }), async () => {
        return request(app.getHttpServer())
            .get(getURL({ page: 1, limit: 20 }))
            .expect(200)
            .then(res => {
                expect(res.body.totalCount).toBeGreaterThanOrEqual(50);
                expect(isExpectPass(res.body.items, comments, ['_id', 'nickName', 'content']));
            });
    });

    it(template({ status: 200, params: { articleId: article._id } }), async () => {
        return request(app.getHttpServer())
            .get(getURL({ articleId: article._id }))
            .expect(200)
            .then(res => {
                expect(res.body.totalCount).toBeGreaterThanOrEqual(50);
                expect(isExpectPass(res.body.items, comments, ['_id', 'nickName', 'content']));
            });
    });

    it(template({ url: '/api/recent-comments', status: 403 }), async () => {
        return request(app.getHttpServer())
            .get(generateUrl({ url: '/api/recent-comments' }))
            .expect(403);
    });

    it(template({ url: '/api/recent-comments', status: 200 }), async () => {
        return request(app.getHttpServer())
            .get(generateUrl({ url: '/api/recent-comments' }))
            .set('authorization', __TOKEN__)
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});
